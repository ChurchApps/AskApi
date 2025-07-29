#!/usr/bin/env node

/**
 * Swagger Preprocessing Script
 * 
 * This script processes swagger JSON files and generates optimized files for OpenAI integration:
 * 1. route-index.json - Lightweight route discovery (token efficient)
 * 2. route-details/*.json - Individual route specifications (on-demand loading)
 * 
 * Usage:
 *   npm run preprocess-swagger
 *   node tools/preprocessSwagger.ts
 *   node tools/preprocessSwagger.ts --output ./custom/output/dir
 */

import { SwaggerHelper } from '../src/helpers/SwaggerHelper';
import * as path from 'path';

async function main() {
  console.log('🔧 Starting swagger preprocessing...');
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf('--output');
  const outputDir = outputIndex !== -1 && args[outputIndex + 1] 
    ? args[outputIndex + 1]
    : './config/optimized';

  try {
    // Generate optimized files
    await SwaggerHelper.generateOptimizedFiles(outputDir);
    
    console.log('✅ Swagger preprocessing completed successfully!');
    console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
    console.log('📋 Generated files:');
    console.log('   - route-index.json (lightweight route discovery)');
    console.log('   - route-details/*.json (detailed route specifications)');
    console.log('');
    console.log('💡 Integration tips:');
    console.log('   1. Load route-index.json for OpenAI route discovery');
    console.log('   2. Load specific route-details/*.json files on-demand');
    console.log('   3. This reduces context usage from ~298KB to ~10-20KB initially');
    
  } catch (error) {
    console.error('❌ Error during swagger preprocessing:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { main as preprocessSwagger };