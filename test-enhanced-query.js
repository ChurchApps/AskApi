const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:3000'; // Adjust if different
const TEST_QUERIES = [
  "How many staff members are at this church?",
  "How many women are at this church?", 
  "Which man has the oldest wife?"
];

// Sample tokens (replace with actual tokens for testing)
const SAMPLE_TOKENS = {
  membershipApiToken: "your-membership-api-token-here",
  attendanceApiToken: "your-attendance-api-token-here",
  givingApiToken: "your-giving-api-token-here"
};

async function testEnhancedQuery(question) {
  console.log(`\n🔍 Testing: "${question}"`);
  console.log('=' .repeat(60));

  try {
    const response = await axios.post(`${BASE_URL}/query/enhanced-ask`, {
      question: question,
      tokens: SAMPLE_TOKENS
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token' // Replace with actual JWT token
      },
      timeout: 30000
    });

    const result = response.data;
    
    console.log('✅ SUCCESS');
    console.log(`📝 Answer: ${result.answer}`);
    console.log(`🎯 Classification: ${result.enhanced.classification.intent} (confidence: ${result.enhanced.classification.confidence.toFixed(2)})`);
    console.log(`🛣️ Route: ${result.enhanced.routeSelection.primaryRoute.method} ${result.enhanced.routeSelection.primaryRoute.path}`);
    console.log(`📊 Data: ${result.enhanced.dataProcessing.totalRecords} → ${result.enhanced.dataProcessing.filteredRecords} records`);
    console.log(`⏱️ Execution: ${result.enhanced.execution.totalTime}ms`);
    console.log(`🪙 Tokens: ${result.enhanced.tokenUsage.totalTokens} used, ${result.enhanced.tokenUsage.tokensSaved} saved`);
    
    return result;

  } catch (error) {
    console.log('❌ ERROR');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.log(`Error: ${error.message}`);
    }
    return null;
  }
}

async function runAllTests() {
  console.log('🚀 Enhanced Query System Test Suite');
  console.log('====================================');
  
  const results = [];
  
  for (const query of TEST_QUERIES) {
    const result = await testEnhancedQuery(query);
    results.push({ query, result });
    
    // Add delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log('\n📈 TEST SUMMARY');
  console.log('===============');
  
  const successful = results.filter(r => r.result !== null).length;
  console.log(`Tests run: ${results.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${results.length - successful}`);
  
  if (successful > 0) {
    const avgTokens = results
      .filter(r => r.result)
      .reduce((sum, r) => sum + r.result.enhanced.tokenUsage.totalTokens, 0) / successful;
    
    const avgTime = results
      .filter(r => r.result)
      .reduce((sum, r) => sum + r.result.enhanced.execution.totalTime, 0) / successful;
    
    console.log(`Average tokens: ${avgTokens.toFixed(0)}`);
    console.log(`Average time: ${avgTime.toFixed(0)}ms`);
  }
}

// Test individual components
async function testClassificationOnly() {
  console.log('\n🧠 Testing Classification Component');
  console.log('==================================');
  
  // This would test the classifier directly if we exposed it as an endpoint
  // For now, we rely on the full enhanced-ask endpoint
  console.log('Classification testing is integrated in the enhanced-ask endpoint');
}

async function testRouteSelection() {
  console.log('\n🛣️ Testing Route Selection');
  console.log('==========================');
  
  try {
    const response = await axios.get(`${BASE_URL}/query/available-routes`, {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });
    
    console.log(`✅ Found ${response.data.totalRoutes} available routes`);
    console.log('Service breakdown:', response.data.stats.serviceBreakdown);
    
  } catch (error) {
    console.log('❌ Error testing route selection:', error.message);
  }
}

// Run tests based on command line argument
const testType = process.argv[2] || 'all';

switch (testType) {
  case 'all':
    runAllTests();
    break;
  case 'classification':
    testClassificationOnly();
    break;
  case 'routes':
    testRouteSelection();
    break;
  case 'single':
    const query = process.argv[3] || TEST_QUERIES[0];
    testEnhancedQuery(query);
    break;
  default:
    console.log('Usage: node test-enhanced-query.js [all|classification|routes|single] [query]');
    console.log('Examples:');
    console.log('  node test-enhanced-query.js all');
    console.log('  node test-enhanced-query.js single "How many staff members are here?"');
    console.log('  node test-enhanced-query.js routes');
}