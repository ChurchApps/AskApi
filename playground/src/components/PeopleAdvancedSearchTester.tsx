import React, { useState } from 'react';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';
import { APIResponse } from '../App';

interface PeopleAdvancedSearchTesterProps {
  setResponse: (response: APIResponse) => void;
}

const PeopleAdvancedSearchTester: React.FC<PeopleAdvancedSearchTesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localResponse, setLocalResponse] = useState<any>(null);

  const exampleQueries = [
    'Find all men',
    'Show me teenagers',
    'Married women over 40',
    'People in Dallas',
    'Single men under 30',
    'Members with birthdays in January',
    'Find people named John',
    'Young adults who are visitors',
    'Women members',
    'Ages 25 to 40',
    'People with last name Smith',
    'Show me all the teens in our church'
  ];

  const handleTest = async () => {
    if (!query.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsLoading(true);
    const timestamp = new Date().toISOString();

    try {
      const response = await fetch(`${EnvironmentHelper.getAskApiUrl()}/query/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userChurch?.jwt}`
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      const apiResponse = {
        status: response.status,
        data,
        timestamp
      };
      setResponse(apiResponse);
      setLocalResponse(apiResponse);
    } catch (error) {
      const errorResponse = {
        status: 0,
        data: { error: `Network error: ${error instanceof Error ? error.message : String(error)}` },
        timestamp
      };
      setResponse(errorResponse);
      setLocalResponse(errorResponse);
    } finally {
      setIsLoading(false);
    }
  };


  const renderLocalResponse = () => {
    if (!localResponse) return null;

    const isSuccess = localResponse.status >= 200 && localResponse.status < 300;
    const data = localResponse.data;

    return (
      <div style={{ marginTop: '20px', borderTop: '1px solid #e1e8ed', paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>📡 Response</h3>
          <span style={{
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '0.9em',
            fontWeight: '600',
            color: 'white',
            background: isSuccess ? '#27ae60' : '#e74c3c'
          }}>
            {localResponse.status === 0 ? 'Network Error' : `Status: ${localResponse.status}`}
          </span>
        </div>

        {!isSuccess ? (
          <div style={{
            background: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '6px',
            padding: '15px',
            color: '#f44336'
          }}>
            <strong>Error:</strong> {data.error || 'Unknown error occurred'}
          </div>
        ) : data.filters ? (
          // Single query result
          <div>
            {/* Query Section */}
            <div style={{
              background: '#e3f2fd',
              border: '1px solid #2196f3',
              borderRadius: '6px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <h4 style={{ color: '#2196f3', margin: '0 0 10px 0' }}>🔍 Query</h4>
              <div style={{ fontSize: '1.1em', fontStyle: 'italic' }}>
                "{data.query}"
              </div>
            </div>

            {/* Filters Section */}
            <div style={{
              background: '#e8f5e8',
              border: '1px solid #27ae60',
              borderRadius: '6px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <h4 style={{ color: '#27ae60', margin: '0 0 15px 0' }}>🎯 Generated Filters</h4>
              {data.filters.length === 0 ? (
                <div style={{ color: '#666', fontStyle: 'italic' }}>No filters generated</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {data.filters.map((filter: any, index: number) => (
                    <div key={index} style={{
                      background: 'white',
                      border: '1px solid #27ae60',
                      borderRadius: '4px',
                      padding: '12px',
                      fontSize: '0.95em'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div>
                          <strong style={{ color: '#2c3e50' }}>Field:</strong><br />
                          <code style={{ background: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
                            {filter.field}
                          </code>
                        </div>
                        <div>
                          <strong style={{ color: '#2c3e50' }}>Operator:</strong><br />
                          <code style={{ background: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
                            {filter.operator}
                          </code>
                        </div>
                        <div>
                          <strong style={{ color: '#2c3e50' }}>Value:</strong><br />
                          <code style={{ background: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
                            {filter.value}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* JSON Preview */}
              <details style={{ marginTop: '15px' }}>
                <summary style={{
                  cursor: 'pointer',
                  padding: '8px',
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid #27ae60',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  📋 Copy JSON Array
                </summary>
                <div style={{
                  marginTop: '10px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid #27ae60',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  overflow: 'auto'
                }}>
                  <pre style={{ margin: 0 }}>{JSON.stringify(data.filters, null, 2)}</pre>
                </div>
              </details>
            </div>
          </div>
        ) : data.testResults ? (
          // Test results
          <div>
            <div style={{
              background: '#e3f2fd',
              border: '1px solid #2196f3',
              borderRadius: '6px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <h4 style={{ color: '#2196f3', margin: '0 0 10px 0' }}>🧪 Test Results</h4>
              <div>Tested {data.testResults.length} queries</div>
            </div>

            {data.testResults.map((result: any, index: number) => (
              <div key={index} style={{
                background: result.error ? '#ffebee' : '#e8f5e8',
                border: `1px solid ${result.error ? '#f44336' : '#27ae60'}`,
                borderRadius: '6px',
                padding: '15px',
                marginBottom: '15px'
              }}>
                <h5 style={{
                  color: result.error ? '#f44336' : '#27ae60',
                  margin: '0 0 10px 0'
                }}>
                  Query {index + 1}: "{result.query}"
                </h5>

                {result.error ? (
                  <div style={{ color: '#f44336' }}>
                    <strong>Error:</strong> {result.error}
                  </div>
                ) : (
                  <div>
                    <strong>Filters Generated:</strong>
                    <pre style={{
                      background: 'rgba(255,255,255,0.7)',
                      padding: '10px',
                      borderRadius: '4px',
                      marginTop: '5px',
                      fontSize: '0.9em',
                      margin: '5px 0 0 0'
                    }}>
                      {JSON.stringify(result.filters, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            padding: '15px',
            fontFamily: 'monospace',
            fontSize: '0.9em'
          }}>
            <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tester-section">
      <h2>🔍 People Advanced Search Tester</h2>
      <p>Test the natural language to search filter conversion system</p>

      <div className="input-group">
        <label htmlFor="peopleQuery">Enter your search query in natural language:</label>
        <input
          id="peopleQuery"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Find married women over 40 in Dallas"
          onKeyPress={(e) => e.key === 'Enter' && handleTest()}
        />
      </div>

      <div className="button-group">
        <button onClick={handleTest} disabled={isLoading}>
          {isLoading ? '🔄 Converting...' : '🔍 Convert to Filters'}
        </button>
        <button onClick={() => setQuery('')} disabled={isLoading}>
          🗑️ Clear
        </button>
      </div>

      <div className="examples-section">
        <h3>Example Queries (click to test):</h3>
        <div className="examples-grid">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              className="example-button"
              onClick={() => setQuery(example)}
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {renderLocalResponse()}
    </div>
  );
};

export default PeopleAdvancedSearchTester;