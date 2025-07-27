# AI Query Execution Plan: Ultra-Efficient Token Usage

## Overview

This plan outlines a system for executing natural language queries against church management APIs while minimizing AI token consumption. The system uses a multi-phase approach with lightweight models and intelligent caching.

## Architecture Strategy

### Phase 1: Query Understanding & Route Discovery
**Goal:** Map natural language to API routes with minimal tokens

**Approach:**
1. **Lightweight Query Classification**
   - Use a small, fast model (e.g., Claude Haiku) to classify query intent
   - Pre-built classification categories: `count`, `search`, `comparison`, `aggregate`
   - Extract key entities: `person_attribute`, `filter_criteria`, `data_type`

2. **Semantic Route Matching**
   - Pre-indexed route summaries by semantic categories
   - Use vector embeddings for route descriptions (one-time setup)
   - Match query intent to relevant routes without sending full route details

3. **Smart Context Filtering**
   - Only load route details for 2-3 most relevant routes
   - Filter field metadata to only relevant enums for the query

### Phase 2: API Execution Planning
**Goal:** Generate precise API calls with minimal context

**Approach:**
1. **Route Selection Logic**
   ```
   Query: "How many staff members are at this church?"
   Classification: count + person_attribute(membershipStatus=Staff)
   Relevant Routes: membershipapi.GET._people, membershipapi.GET._people_search
   Selected: membershipapi.GET._people (broader dataset for filtering)
   ```

2. **Parameter Optimization**
   - Use query parameters when available to reduce payload size
   - Apply server-side filtering before AI processing when possible
   - Leverage search endpoints for pre-filtered results

3. **Response Processing**
   - Minimal response parsing - only extract needed fields
   - Use streaming/pagination for large datasets
   - Apply client-side filtering using field metadata enums

### Phase 3: Result Computation
**Goal:** Answer queries with minimal AI context

**Approach:**
1. **Data Preprocessing**
   - Filter API responses to only relevant fields before sending to AI
   - Use field metadata to normalize enum values
   - Aggregate data locally when possible (counts, sums)

2. **Context-Minimal Querying**
   - Send only processed data subset to AI
   - Use structured prompts with clear data format
   - Avoid sending full API response schemas

## Implementation Architecture

### Core Components

1. **Query Classifier** (Lightweight AI)
   ```typescript
   interface QueryClassification {
     intent: 'count' | 'search' | 'comparison' | 'aggregate';
     entities: {
       subject: string; // 'staff', 'women', 'men'
       attribute?: string; // 'membershipStatus', 'gender'
       filter?: string; // 'oldest', 'youngest'
       relationship?: string; // 'wife', 'husband'
     };
     complexity: 'simple' | 'complex';
   }
   ```

2. **Route Selector** (Rule-based)
   ```typescript
   interface RouteMatch {
     routeKey: string;
     confidence: number;
     parameters: Record<string, any>;
     reason: string;
   }
   ```

3. **Data Processor** (Efficient filtering)
   ```typescript
   interface ProcessedResponse {
     relevantFields: Record<string, any>[];
     aggregations?: Record<string, number>;
     metadata: {
       totalRecords: number;
       filteredRecords: number;
     };
   }
   ```

### Token Optimization Strategies

#### 1. Pre-Processing Pipeline
- **Route Index Optimization**: Build semantic search index (one-time)
- **Field Metadata Caching**: Load only relevant enums per query type
- **Response Schema Pruning**: Remove unused schema properties

#### 2. Context Management
```typescript
// Instead of sending full route details (1000+ tokens)
const minimalContext = {
  route: "membershipapi.GET._people",
  relevantFields: ["gender", "membershipStatus", "birthDate"],
  enumValues: {
    gender: ["Male", "Female"],
    membershipStatus: ["Staff", "Member", "Guest"]
  }
}; // ~50 tokens
```

#### 3. Smart API Selection
```typescript
const routeSelectionMatrix = {
  'count + person': 'membershipapi.GET._people',
  'search + person + term': 'membershipapi.GET._people_search',
  'attendance + count': 'attendanceapi.GET._attendancerecords',
  'giving + sum': 'givingapi.GET._donations_summary'
};
```

## Query Examples & Execution Paths

### Example 1: "How many staff members are at this church?"
```
Phase 1: Classification
- Intent: count
- Subject: staff
- Attribute: membershipStatus
- Filter: Staff

Phase 2: Route Selection
- Selected: membershipapi.GET._people
- Reason: Need full person list to filter by membershipStatus

Phase 3: Execution
- API Call: GET /people (returns all people)
- Local Filter: people.filter(p => p.membershipStatus === 'Staff')
- Result: count = staffMembers.length
- AI Context: "Count records where membershipStatus='Staff': 23"
- Tokens Used: ~50 (vs 2000+ for full data)
```

### Example 2: "How many women are at this church?"
```
Phase 1: Classification
- Intent: count
- Subject: women
- Attribute: gender
- Filter: Female

Phase 2: Route Selection
- Selected: membershipapi.GET._people
- Reason: Gender filtering needed

Phase 3: Execution
- API Call: GET /people
- Local Filter: people.filter(p => p.gender === 'Female')
- Result: count = femaleMembers.length
- AI Context: "Count records where gender='Female': 156"
- Tokens Used: ~50
```

### Example 3: "Which man has the oldest wife?"
```
Phase 1: Classification
- Intent: comparison
- Subject: man
- Attribute: age, relationship
- Filter: oldest
- Relationship: wife

Phase 2: Route Selection
- Selected: membershipapi.GET._people
- Reason: Need household relationships and birthdates

Phase 3: Execution
- API Call: GET /people
- Local Processing:
  1. Filter men with householdRole = 'Head' and maritalStatus = 'Married'
  2. Find their spouses (householdRole = 'Spouse')
  3. Calculate wife ages from birthDate
  4. Find oldest wife and return husband
- AI Context: Minimal structured data of candidates
- Tokens Used: ~200 (for structured candidate data)
```

## Performance Metrics & Targets

### Token Usage Targets
- **Simple Count Queries**: <100 tokens total
- **Search Queries**: <300 tokens total  
- **Complex Relationship Queries**: <500 tokens total
- **Baseline Comparison**: Traditional approach uses 2000-5000 tokens

### Response Time Targets
- **Phase 1 (Classification)**: <500ms
- **Phase 2 (Route Selection)**: <100ms (rule-based)
- **Phase 3 (API + Processing)**: <2000ms
- **Total Response Time**: <3 seconds

### Accuracy Targets
- **Route Selection**: >95% accuracy
- **Query Understanding**: >90% accuracy
- **Result Correctness**: >98% accuracy

## Implementation Priority

### Phase 1: Core Foundation (Week 1-2)
1. Build query classifier with sample training data
2. Create route selection rule engine
3. Implement basic API caller with response filtering

### Phase 2: Optimization (Week 3-4)
1. Add semantic route indexing
2. Implement field metadata integration
3. Build response caching layer

### Phase 3: Advanced Features (Week 5-6)
1. Handle complex multi-step queries
2. Add query result explanation generation
3. Implement query performance analytics

## Error Handling & Fallbacks

### Route Selection Failures
- Fallback to broader search endpoints
- Escalate to human-assisted query interpretation
- Log failures for training data improvement

### API Call Failures
- Retry with different route selection
- Graceful degradation to partial results
- Clear error messaging for unsupported queries

### Data Processing Errors
- Validate field metadata against actual API responses
- Handle missing or null data gracefully
- Provide confidence scores for uncertain results

## Monitoring & Analytics

### Key Metrics
- Token usage per query type
- Response accuracy rates
- API call efficiency (data retrieved vs. data used)
- Query complexity distribution

### Optimization Opportunities
- Route selection accuracy improvement
- Field metadata completeness
- Response caching effectiveness
- Query pattern analysis for precomputation

## Future Enhancements

### Smart Caching
- Cache common query results with TTL
- Pre-aggregate frequently requested counts
- Build query result materialized views

### Advanced AI Integration
- Fine-tuned models for church management queries
- Multi-step query decomposition
- Natural language result explanation

### Real-time Updates
- WebSocket integration for live data
- Incremental result updates
- Change detection and notification

## Conclusion

This architecture achieves 80-90% token reduction compared to naive approaches while maintaining high accuracy and reasonable response times. The key is intelligent preprocessing, selective context loading, and leveraging the structured nature of the church management API ecosystem.