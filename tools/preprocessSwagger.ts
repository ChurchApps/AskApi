#!/usr/bin/env node

/**
 * Swagger Preprocessing Script
 * Processes swagger JSON and generates optimized files for OpenAI integration:
 * 1. route-index.json - Lightweight route discovery
 * 2. route-details/*.json - Individual route specifications
 */

import { SwaggerHelper } from '../src/helpers/SwaggerHelper';
import * as path from 'path';

async function main() {
  console.log('🔧 Starting swagger preprocessing...');

  const args = process.argv.slice(2);
  const outputIndex = args.indexOf('--output');
  const outputDir = outputIndex !== -1 && args[outputIndex + 1]
    ? args[outputIndex + 1]
    : './config/optimized';

  try {
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
    console.log('   3. Reduces context usage from ~298KB to ~10-20KB initially');
    
  } catch (error) {
    console.error('❌ Error during swagger preprocessing:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { main as preprocessSwagger };