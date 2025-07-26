import React, { useState } from 'react';
import { APIResponse } from '../App';
import { ApiHelper } from '@churchapps/apphelper';
import { useUserContext } from '../contexts/UserContext';

interface QuestionsAPIProps {
  setResponse: (response: APIResponse) => void;
}

const QuestionsAPI: React.FC<QuestionsAPIProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [endpoint, setEndpoint] = useState('/questions');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [loading, setLoading] = useState(false);

  const endpointOptions = [
    { method: 'GET', path: '/questions', name: 'Get All Questions' },
    { method: 'GET', path: '/questions/:id', name: 'Get Question by ID' },
    { method: 'GET', path: '/questions?userId=', name: 'Get Questions by User' },
    { method: 'POST', path: '/questions', name: 'Create Question' },
    { method: 'PUT', path: '/questions/:id', name: 'Update Question' },
    { method: 'DELETE', path: '/questions/:id', name: 'Delete Question' },
  ];

  const setEndpointOption = (selectedMethod: string, selectedPath: string) => {
    setMethod(selectedMethod);
    setEndpoint(selectedPath);
    
    // Set example body for POST/PUT
    if (selectedMethod === 'POST' && selectedPath === '/questions') {
      setRequestBody(JSON.stringify({
        question: "What time is the Sunday service?",
        userId: "user123"
      }, null, 2));
    } else if (selectedMethod === 'PUT' && selectedPath === '/questions/:id') {
      setRequestBody(JSON.stringify({
        answer: "Sunday service is at 10:30 AM",
        inputTokens: 15,
        outputTokens: 8,
        seconds: 0.5
      }, null, 2));
    } else {
      setRequestBody('');
    }
  };

  const sendRequest = async () => {
    if (!userChurch || !userChurch.jwt) {
      alert('Please log in first');
      return;
    }

    setLoading(true);

    try {
      // Use ApiHelper to make the request to AskApi
      let data;
      const apiName = 'AskApi';
      
      if (method === 'GET') {
        data = await ApiHelper.get(endpoint, apiName);
      } else if (method === 'POST') {
        const body = requestBody ? JSON.parse(requestBody) : {};
        data = await ApiHelper.post(endpoint, body, apiName);
      } else if (method === 'PUT') {
        const body = requestBody ? JSON.parse(requestBody) : {};
        data = await ApiHelper.put(endpoint, body, apiName);
      } else if (method === 'DELETE') {
        data = await ApiHelper.delete(endpoint, apiName);
      }
      
      setResponse({
        status: 200,
        data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setResponse({
        status: 0,
        data: { error: (error as Error).message },
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="section-title">📋 Questions API</div>
      
      <div className="button-group">
        {endpointOptions.map((option) => (
          <button
            key={`${option.method}-${option.path}`}
            className={`btn ${method === option.method && endpoint === option.path ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setEndpointOption(option.method, option.path)}
          >
            {option.method} {option.name}
          </button>
        ))}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="endpoint">Endpoint</label>
          <input
            type="text"
            id="endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="method">Method</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      {(method === 'POST' || method === 'PUT') && (
        <div className="form-group">
          <label htmlFor="requestBody">Request Body (JSON)</label>
          <textarea
            id="requestBody"
            placeholder='{"question": "What time is service?"}'
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
          />
        </div>
      )}

      <button 
        className="btn btn-primary" 
        onClick={sendRequest}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Request'}
      </button>
    </div>
  );
};

export default QuestionsAPI;