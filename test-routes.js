const { RouteDiscoveryService } = require('./dist/services/RouteDiscoveryService');

async function test() {
  try {
    const service = RouteDiscoveryService.getInstance();
    await service.loadRouteIndex();
    
    console.log('✅ Route discovery service loaded successfully');
    
    // Search for routes related to membership/people count
    const membershipRoutes = service.searchRoutes('members people count church');
    console.log('\n🔍 Found routes for membership query:');
    membershipRoutes.slice(0, 5).forEach(route => {
      console.log(`  - ${route.method} ${route.path} - ${route.summary}`);
    });
    
    // Specifically look for people-related routes
    const peopleRoutes = service.getRoutesByService('membershipapi');
    console.log('\n👥 MembershipAPI routes:');
    peopleRoutes.slice(0, 10).forEach(route => {
      console.log(`  - ${route.method} ${route.path} - ${route.summary}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();