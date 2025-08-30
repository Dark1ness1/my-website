// scripts/generate-embeddings.mjs
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' }); 

import { HfInference } from '@huggingface/inference';
import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const postsDirectory = path.join(process.cwd(), 'posts');
// Using a more reliable embedding model for the HF Inference API
const embeddingModel = "BAAI/bge-small-en-v1.5";

// --- INITIALIZE HUGGING FACE CLIENT ---
console.log("Initializing Hugging Face client...");
const hf = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN);

// --- INITIALIZE PINECONE ---
console.log("Initializing Pinecone client...");
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pinecone.index(process.env.PINECONE_INDEX_NAME, process.env.PINECONE_INDEX_HOST);

// --- HUGGING FACE API FUNCTION (USING OFFICIAL LIBRARY) ---
async function getEmbedding(text) {
  try {
    // Try feature extraction first
    const result = await hf.featureExtraction({
      model: embeddingModel,
      inputs: text
    });

    console.log('Raw result type:', typeof result);
    console.log('Is array:', Array.isArray(result));
    if (Array.isArray(result)) {
      console.log('Array length:', result.length);
      if (result.length > 0) {
        console.log('First element type:', typeof result[0]);
        console.log('First element is array:', Array.isArray(result[0]));
      }
    }

    // Handle different response formats
    if (Array.isArray(result)) {
      // If it's a 2D array (tokens x dimensions), do mean pooling
      if (Array.isArray(result[0])) {
        console.log('Detected 2D array, applying mean pooling...');
        const numTokens = result.length;
        const dimensions = result[0].length;
        const pooled = new Array(dimensions).fill(0);
        
        for (let i = 0; i < numTokens; i++) {
          for (let j = 0; j < dimensions; j++) {
            pooled[j] += result[i][j];
          }
        }
        
        return pooled.map(val => val / numTokens);
      }
      // If it's already 1D, return as-is
      console.log('Detected 1D array, using as-is...');
      return result;
    }
    
    console.log('Unexpected result format, returning as-is...');
    return result;
    
  } catch (error) {
    console.error('Feature extraction failed:', error.message);
    
    // Fallback: try sentence similarity (though this won't give us embeddings)
    console.log('Trying alternative approach...');
    throw new Error(`Could not generate embedding: ${error.message}`);
  }
}

async function main() {
  console.log("Starting embedding generation process...");
  
  // Test the API first
  console.log("🧪 Testing Hugging Face API...");
  try {
    const testEmbedding = await getEmbedding("This is a test sentence.");
    console.log(`✅ API test successful!`);
    console.log(`📊 Embedding type: ${typeof testEmbedding}`);
    console.log(`📊 Is array: ${Array.isArray(testEmbedding)}`);
    if (Array.isArray(testEmbedding)) {
      console.log(`📊 Embedding dimension: ${testEmbedding.length}`);
      console.log(`📊 First few values: ${testEmbedding.slice(0, 5)}`);
    }
    console.log('');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check your HUGGING_FACE_ACCESS_TOKEN in .env.local');
    console.log('2. Make sure your HF token has the right permissions');
    console.log('3. Try installing the HF library: npm install @huggingface/inference');
    return;
  }

  // --- READ AND PROCESS FILES ---
  console.log("Reading files from 'posts' directory...");
  
  if (!fs.existsSync(postsDirectory)) {
    console.log("❌ Posts directory not found!");
    console.log("Create a 'posts' directory with some .md files first.");
    return;
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const mdFiles = fileNames.filter(name => name.endsWith('.md'));
  
  if (mdFiles.length === 0) {
    console.log("❌ No .md files found in posts directory!");
    return;
  }
  
  console.log(`📁 Found ${mdFiles.length} markdown files\n`);

  for (const fileName of mdFiles) {
    console.log(`📄 Processing: ${fileName}`);
    
    try {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Clean up the content (remove excessive whitespace, normalize line endings)
      const cleanContent = fileContents
        .replace(/\r\n/g, '\n')  // Normalize line endings
        .replace(/\n{3,}/g, '\n\n')  // Remove excessive newlines
        .trim();

      const embedding = await getEmbedding(cleanContent);

      if (!embedding || !Array.isArray(embedding)) {
        console.error(`❌ Invalid embedding received for ${fileName}. Skipping.`);
        console.log(`Received:`, typeof embedding, embedding);
        continue;
      }

      console.log(`📤 Upserting '${fileName}' to Pinecone...`);
      await index.upsert([{
        id: fileName.replace('.md', ''), // Remove .md extension for cleaner IDs
        values: embedding,
        metadata: { 
          filename: fileName,
          text: cleanContent.substring(0, 1000) + (cleanContent.length > 1000 ? '...' : ''),
          title: extractTitle(cleanContent) || fileName
        },
      }]);
      
      console.log(`✅ Successfully uploaded: ${fileName}`);
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
      continue;
    }
  }

  console.log("\n🎉 Embedding generation and upload complete!");
  console.log(`📊 Successfully processed ${mdFiles.length} files`);
  
  // Test a query
  console.log("\n🔍 Testing semantic search...");
  try {
    const testQuery = "What is this blog about?";
    const queryEmbedding = await getEmbedding(testQuery);
    
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK: 3,
      includeMetadata: true,
    });

    console.log(`\nQuery: "${testQuery}"`);
    console.log('📋 Top matches:');
    searchResults.matches?.forEach((match, i) => {
      const title = match.metadata?.title || match.metadata?.filename || match.id;
      const score = ((match.score || 0) * 100).toFixed(1);
      console.log(`${i + 1}. ${title} (${score}% match)`);
    });
    
  } catch (error) {
    console.log('❌ Query test failed:', error.message);
  }
}

// Helper function to extract title from markdown content
function extractTitle(content) {
  const lines = content.split('\n');
  
  // Look for YAML frontmatter title
  if (content.startsWith('---')) {
    const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/i);
    if (titleMatch) return titleMatch[1].trim();
  }
  
  // Look for first # heading
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.replace('# ', '').trim();
    }
  }
  
  return null;
}

main().catch(console.error);