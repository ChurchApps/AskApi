// Test to debug token handling
const axios = require('axios');

async function testTokenHandling() {
  const url = 'http://localhost:8097/query/ask';
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9QMXNlZkdoRGZGIiwiZW1haWwiOiJqem9uZ2tlckBsaXZlY3Mub3JnIiwiZmlyc3ROYW1lIjoiSmVyZW15IiwibGFzdE5hbWUiOiJab25na2VyIiwiY2h1cmNoSWQiOiJBT2pJdDBXLVNlWSIsInBlcnNvbklkIjoiYlRySzZkMGt2RjYiLCJhcGlOYW1lIjoiTWVtYmVyc2hpcEFwaSIsInBlcm1pc3Npb25zIjpbIkZvcm1zX19BZG1pbiIsIkZvcm1zX19FZGl0IiwiR3JvdXAgTWVtYmVyc19fRWRpdCIsIkdyb3VwIE1lbWJlcnNfX1ZpZXciLCJHcm91cHNfX0VkaXQiLCJOb3Rlc19fRWRpdCIsIk5vdGVzX19WaWV3IiwiUGVvcGxlX19FZGl0IiwiUGVvcGxlX19FZGl0IFNlbGYiLCJQZW9wbGVfX1ZpZXciLCJQZW9wbGVfX1ZpZXcgTWVtYmVycyIsIlBsYW5zX19FZGl0IiwiUm9sZXNfX0VkaXQiLCJSb2xlc19fVmlldyIsIlNldHRpbmdzX19FZGl0Il0sImdyb3VwSWRzIjpbIkhFUThDaGNUZ3VGIiwiUDk1alhrWHdnSTkiLCJFWjMwdFdwU3lHOSIsIkxUdHo5TDVpclEtIiwia2FWdTBkNWRWekIiLCJsZ2NpVHBnN1IwTCIsInY0UUpoalY5MUlTIiwiUThPYjBiSG9OSGYiLCJWM2RFYjZZMVhsbiIsIjIzRVlia2ZiRWhRIl0sImxlYWRlckdyb3VwSWRzIjpbIkhFUThDaGNUZ3VGIiwiUDk1alhrWHdnSTkiLCJFWjMwdFdwU3lHOSIsIkxUdHo5TDVpclEtIiwia2FWdTBkNWRWekIiLCJsZ2NpVHBnN1IwTCIsInY0UUpoalY5MUlTIiwiUThPYjBiSG9OSGYiLCJWM2RFYjZZMVhsbiIsIjIzRVlia2ZiRWhRIl0sImlhdCI6MTczNzUzMzE4NSwiZXhwIjoxNzM3NzA1OTg1fQ.HxtNNxRMV4C9OJKwNIjNSLCCNfZbKI8TIyGnLKzYgCA';
  
  console.log('Testing different token configurations...\n');
  
  // Test 1: With membershipApiToken (correct key)
  console.log('Test 1: Using membershipApiToken');
  const payload1 = {
    question: "How many members attend this church?",
    tokens: {
      membershipApiToken: authToken
    }
  };
  
  try {
    const response1 = await axios.post(url, payload1, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Response:', response1.data.answer?.substring(0, 100) + '...');
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 2: With all tokens
  console.log('Test 2: Using all tokens populated');
  const payload2 = {
    question: "How many members attend this church?",
    tokens: {
      attendanceApiToken: authToken,
      contentApiToken: authToken,
      doingApiToken: authToken,
      givingApiToken: authToken,
      membershipApiToken: authToken,
      messagingApiToken: authToken,
      reportingApiToken: authToken
    }
  };
  
  try {
    const response2 = await axios.post(url, payload2, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Response:', response2.data.answer?.substring(0, 100) + '...');
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test 3: With empty tokens object
  console.log('Test 3: With empty tokens object');
  const payload3 = {
    question: "How many members attend this church?",
    tokens: {}
  };
  
  try {
    const response3 = await axios.post(url, payload3, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Response:', response3.data.answer?.substring(0, 100) + '...');
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }
}

testTokenHandling().catch(console.error);