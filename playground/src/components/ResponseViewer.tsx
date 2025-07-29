import React from 'react';
import { APIResponse } from '../App';

interface ResponseViewerProps {
  response: APIResponse;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ response }) => {
  const isSuccess = response.status >= 200 && response.status < 300;
  
  const formatResponse = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return String(data);
    }
  };

  // Check if this is an enhanced query response
  const isEnhancedResponse = response.data && 
    response.data.executionMetrics && 
    response.data.tokenComparison &&
    typeof response.data.answer === 'string';

  // Check if this is a people advanced search response
  const isPeopleSearchResponse = response.data && 
    (response.data.filters || response.data.testResults);

  const renderPeopleSearchResponse = (data: any) => {
    // Single query result
    if (data.filters) {
      return (
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
                        <strong style={{ color: '#2c3e50' }}>Field:</strong><br/>
                        <code style={{ background: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
                          {filter.field}
                        </code>
                      </div>
                      <div>
                        <strong style={{ color: '#2c3e50' }}>Operator:</strong><br/>
                        <code style={{ background: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
                          {filter.operator}
                        </code>
                      </div>
                      <div>
                        <strong style={{ color: '#2c3e50' }}>Value:</strong><br/>
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
                📋 View as JSON Array
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
                <pre>{JSON.stringify(data.filters, null, 2)}</pre>
              </div>
            </details>
          </div>

          {/* Debug Info */}
          {data.debug && (
            <details style={{ marginTop: '15px' }}>
              <summary style={{ 
                cursor: 'pointer', 
                padding: '10px', 
                background: '#fff3cd', 
                border: '1px solid #ffc107', 
                borderRadius: '6px',
                fontWeight: '600'
              }}>
                🔧 Debug Information
              </summary>
              <div style={{ 
                marginTop: '10px', 
                padding: '15px', 
                background: '#fff3cd', 
                border: '1px solid #ffc107', 
                borderRadius: '6px',
                fontSize: '0.9em'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Raw OpenAI Response:</strong>
                  <pre style={{ background: 'rgba(0,0,0,0.05)', padding: '8px', borderRadius: '4px', marginTop: '5px' }}>
                    {data.debug.rawResponse}
                  </pre>
                </div>
              </div>
            </details>
          )}
        </div>
      );
    }

    // Test results
    if (data.testResults) {
      return (
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
                  {result.rawResponse && (
                    <div style={{ marginTop: '8px' }}>
                      <strong>Raw Response:</strong>
                      <pre style={{ background: 'rgba(0,0,0,0.05)', padding: '8px', borderRadius: '4px', marginTop: '5px' }}>
                        {result.rawResponse}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <strong>Filters Generated:</strong>
                  <pre style={{ background: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: '4px', marginTop: '5px', fontSize: '0.9em' }}>
                    {JSON.stringify(result.filters, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const renderEnhancedResponse = (data: any) => {
    return (
      <div>
        {/* Answer Section */}
        <div style={{ 
          background: '#e8f5e8', 
          border: '1px solid #27ae60', 
          borderRadius: '6px', 
          padding: '15px', 
          marginBottom: '15px' 
        }}>
          <h4 style={{ color: '#27ae60', margin: '0 0 10px 0' }}>💬 Answer</h4>
          <div style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
            {data.answer}
          </div>
          {data.confidence && (
            <div style={{ 
              marginTop: '10px', 
              fontSize: '0.9em', 
              color: '#27ae60',
              fontWeight: '600'
            }}>
              Confidence: {(data.confidence * 100).toFixed(1)}%
            </div>
          )}
        </div>

        {/* Performance Summary */}
        {data.tokenComparison && (
          <div style={{ 
            background: '#e3f2fd', 
            border: '1px solid #2196f3', 
            borderRadius: '6px', 
            padding: '15px', 
            marginBottom: '15px' 
          }}>
            <h4 style={{ color: '#2196f3', margin: '0 0 10px 0' }}>⚡ Performance Summary</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <div>
                <strong>Tokens Used:</strong><br/>
                {data.tokenComparison.enhanced} (Enhanced)
              </div>
              <div>
                <strong>Traditional Would Use:</strong><br/>
                {data.tokenComparison.traditional} tokens
              </div>
              <div style={{ color: '#27ae60' }}>
                <strong>Tokens Saved:</strong><br/>
                {data.tokenComparison.savings} ({data.tokenComparison.percentSaved}%)
              </div>
              <div>
                <strong>Execution Time:</strong><br/>
                {data.executionMetrics.totalExecutionTime < 1000 
                  ? `${data.executionMetrics.totalExecutionTime.toFixed(0)}ms`
                  : `${(data.executionMetrics.totalExecutionTime / 1000).toFixed(2)}s`
                }
              </div>
            </div>
          </div>
        )}

        {/* Full Response Details */}
        <details style={{ marginTop: '15px' }}>
          <summary style={{ 
            cursor: 'pointer', 
            padding: '10px', 
            background: '#f8f9fa', 
            border: '1px solid #dee2e6', 
            borderRadius: '6px',
            fontWeight: '600'
          }}>
            📋 View Full Response Data
          </summary>
          <div style={{ 
            marginTop: '10px', 
            padding: '15px', 
            background: '#f8f9fa', 
            border: '1px solid #dee2e6', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            <pre>{formatResponse(data)}</pre>
          </div>
        </details>
      </div>
    );
  };

  return (
    <div className="section">
      <div className="section-title">📡 Response</div>
      
      <div className="response-section">
        <div className="response-header">
          <span>Response at {new Date(response.timestamp).toLocaleString()}</span>
          <span className={`status-badge ${isSuccess ? 'status-success' : 'status-error'}`}>
            {response.status === 0 ? 'Network Error' : `Status: ${response.status}`}
          </span>
        </div>
        
        <div className="response-body">
          {isSuccess && isPeopleSearchResponse ? 
            renderPeopleSearchResponse(response.data) :
            isSuccess && isEnhancedResponse ? 
              renderEnhancedResponse(response.data) : 
              formatResponse(response.data)
          }
        </div>
      </div>
    </div>
  );
};

export default ResponseViewer;