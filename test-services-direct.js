const path = require('path');

// Test the services directly without HTTP layer
async function testServicesDirectly() {
  console.log('🚀 Enhanced Query Services Direct Test');
  console.log('=====================================\n');

  try {
    // Import services from dist (compiled TypeScript)
    const { QueryClassifier } = require('./dist/src/services/QueryClassifier');
    const { RouteSelector } = require('./dist/src/services/RouteSelector');
    const { DataProcessor } = require('./dist/src/services/DataProcessor');

    console.log('📦 Services imported successfully');

    // Test queries
    const testQueries = [
      "How many staff members are at this church?",
      "How many women are at this church?", 
      "Which man has the oldest wife?"
    ];

    for (const query of testQueries) {
      console.log(`\n🔍 Testing: "${query}"`);
      console.log('=' .repeat(60));

      try {
        // Test 1: Query Classification
        console.log('1️⃣ Query Classification...');
        const classifier = QueryClassifier.getInstance();
        const classification = await classifier.classifyQuery(query);
        
        console.log(`   Intent: ${classification.intent}`);
        console.log(`   Subject: ${classification.entities.subject}`);
        console.log(`   Confidence: ${classification.confidence.toFixed(2)}`);
        
        // Test 2: Route Selection
        console.log('2️⃣ Route Selection...');
        const routeSelector = RouteSelector.getInstance();
        const routeSelection = routeSelector.selectRoutes(classification);
        
        console.log(`   Primary Route: ${routeSelection.primaryRoute.method} ${routeSelection.primaryRoute.path}`);
        console.log(`   Confidence: ${routeSelection.confidence.toFixed(2)}`);
        console.log(`   Reason: ${routeSelection.reason}`);
        
        // Test 3: Data Processing (with mock data)
        console.log('3️⃣ Data Processing...');
        const dataProcessor = DataProcessor.getInstance();
        
        // Mock API response data for testing
        const mockData = generateMockData(classification.intent);
        const processedData = dataProcessor.processApiResponse(mockData, classification);
        
        console.log(`   Total Records: ${processedData.totalRecords}`);
        console.log(`   Filtered Records: ${processedData.filteredRecords}`);
        console.log(`   Summary: ${processedData.summary}`);
        
        console.log('✅ All services working correctly');

      } catch (error) {
        console.log(`❌ Service Error: ${error.message}`);
      }
    }

  } catch (importError) {
    console.log(`❌ Import Error: ${importError.message}`);
    console.log('Make sure the project is built with: npm run build');
  }
}

function generateMockData(intent) {
  // Generate appropriate mock data based on query intent
  if (intent === 'count') {
    return [
      { id: 1, firstName: 'John', lastName: 'Doe', gender: 'Male', membershipStatus: 'Staff', birthDate: '1980-01-01' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', gender: 'Female', membershipStatus: 'Member', birthDate: '1985-05-15' },
      { id: 3, firstName: 'Bob', lastName: 'Johnson', gender: 'Male', membershipStatus: 'Staff', birthDate: '1975-12-10' },
      { id: 4, firstName: 'Alice', lastName: 'Wilson', gender: 'Female', membershipStatus: 'Staff', birthDate: '1990-03-20' },
      { id: 5, firstName: 'Mike', lastName: 'Brown', gender: 'Male', membershipStatus: 'Member', birthDate: '1988-07-08' }
    ];
  }
  
  if (intent === 'comparison') {
    // Mock household data for relationship queries
    return [
      { id: 1, firstName: 'John', lastName: 'Doe', gender: 'Male', householdRole: 'Head', maritalStatus: 'Married', birthDate: '1980-01-01', householdId: 1 },
      { id: 2, firstName: 'Jane', lastName: 'Doe', gender: 'Female', householdRole: 'Spouse', maritalStatus: 'Married', birthDate: '1950-05-15', householdId: 1 },
      { id: 3, firstName: 'Bob', lastName: 'Smith', gender: 'Male', householdRole: 'Head', maritalStatus: 'Married', birthDate: '1970-12-10', householdId: 2 },
      { id: 4, firstName: 'Alice', lastName: 'Smith', gender: 'Female', householdRole: 'Spouse', maritalStatus: 'Married', birthDate: '1945-03-20', householdId: 2 }
    ];
  }
  
  return [];
}

// Run the test
testServicesDirectly().catch(console.error);