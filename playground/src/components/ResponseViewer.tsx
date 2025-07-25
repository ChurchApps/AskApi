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
          {formatResponse(response.data)}
        </div>
      </div>
    </div>
  );
};

export default ResponseViewer;