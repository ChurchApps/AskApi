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
          {isSuccess && isEnhancedResponse ? 
            renderEnhancedResponse(response.data) : 
            formatResponse(response.data)
          }
        </div>
      </div>
    </div>
  );
};

export default ResponseViewer;