import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface QueryV2FormApiCallsTesterProps {
  setResponse: (response: APIResponse) => void;
}

interface ApiTokens {
  attendanceApiToken: string;
  contentApiToken: string;
  doingApiToken: string;
  givingApiToken: string;
  membershipApiToken: string;
  messagingApiToken: string;
  reportingApiToken: string;
}

const QueryV2FormApiCallsTester: React.FC<QueryV2FormApiCallsTesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [question, setQuestion] = useState('');
  const [formattedCalls, setFormattedCalls] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [tokens, setTokens] = useState<ApiTokens>({
    attendanceApiToken: '',
    contentApiToken: '',
    doingApiToken: '',
    givingApiToken: '',
    membershipApiToken: '',
    messagingApiToken: '',
    reportingApiToken: ''
  });

  // Sample questions for testing API call formation
  const sampleQuestions = [
    'How many people are in our church?',
    'What was our attendance last Sunday?',
    'Show me all donations from this month',
    'Who are our group leaders?',
    'What events do we have coming up?',
    'What sermons were posted this year?',
    'Who has tasks assigned to them?',
    'Show me recent messages in our church',
    'What are our recurring donation amounts?',
    'List all our church services'
  ];

  // Auto-populate tokens from userChurch context when it changes
  useEffect(() => {
    if (userChurch && userChurch.apis && userChurch.apis.length > 0) {
      const newTokens: ApiTokens = {
        attendanceApiToken: '',
        contentApiToken: '',
        doingApiToken: '',
        givingApiToken: '',
        membershipApiToken: '',
        messagingApiToken: '',
        reportingApiToken: ''
      };

      // Map API tokens from userChurch.apis array
      userChurch.apis.forEach(api => {
        switch (api.keyName) {
          case 'AttendanceApi':
            newTokens.attendanceApiToken = api.jwt;
            break;
          case 'ContentApi':
            newTokens.contentApiToken = api.jwt;
            break;
          case 'DoingApi':
            newTokens.doingApiToken = api.jwt;
            break;
          case 'GivingApi':
            newTokens.givingApiToken = api.jwt;
            break;
          case 'MembershipApi':
            newTokens.membershipApiToken = api.jwt;
            break;
          case 'MessagingApi':
            newTokens.messagingApiToken = api.jwt;
            break;
          case 'ReportingApi':
            newTokens.reportingApiToken = api.jwt;
            break;
        }
      });

      setTokens(newTokens);
    }
  }, [userChurch]);

  const handleTokenChange = (apiName: keyof ApiTokens, value: string) => {
    setTokens(prev => ({
      ...prev,
      [apiName]: value
    }));
  };

  const handleUseAuthToken = () => {
    if (userChurch?.jwt) {
      setTokens({
        attendanceApiToken: userChurch.jwt,
        contentApiToken: userChurch.jwt,
        doingApiToken: userChurch.jwt,
        givingApiToken: userChurch.jwt,
        membershipApiToken: userChurch.jwt,
        messagingApiToken: userChurch.jwt,
        reportingApiToken: userChurch.jwt
      });
    }
  };

  const setQuestionExample = (exampleQuestion: string) => {
    setQuestion(exampleQuestion);
  };

  const handleFormApiCalls = async () => {
    if (!question.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a question' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);
    setFormattedCalls('');

    try {
      const response = await axios.post(
        `${EnvironmentHelper.getAskApiUrl()}/queryV2/formApiCalls`,
        {
          question
        },
        {
          headers: {
            'Authorization': `Bearer ${userChurch?.jwt || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Extract the formed API calls from the response
      let callsData = '';
      if (typeof response.data === 'string') {
        callsData = response.data;
      } else if (response.data.answer) {
        callsData = response.data.answer;
      } else {
        callsData = JSON.stringify(response.data, null, 2);
      }

      setFormattedCalls(callsData);

      setResponse({
        status: response.status,
        data: response.data,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      setResponse({
        status: error.response?.status || 500,
        data: error.response?.data || { error: error.message },
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCallsToClipboard = () => {
    navigator.clipboard.writeText(formattedCalls).then(() => {
      alert('API calls copied to clipboard!');
    });
  };

  return (
    <div className="section">
      <h2 className="section-title">⚙️ API Call Formation (QueryV2)</h2>
      <p>Generate specific API calls with parameters needed to answer questions</p>

      <div className="info-box">
        ℹ️ This endpoint first determines required routes, then forms the specific API calls with parameters needed to gather data for your question.
      </div>

      <div className="form-group">
        <label htmlFor="question">Your Question:</label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., How many people attended last Sunday?"
          style={{ width: '100%' }}
          disabled={loading}
        />
      </div>

      <div className="query-examples">
        <label>Sample Questions:</label>
        <div className="example-tags">
          {sampleQuestions.map((sampleQuestion, index) => (
            <button
              key={index}
              className="example-tag"
              onClick={() => setQuestionExample(sampleQuestion)}
            >
              {sampleQuestion}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={showTokens}
            onChange={(e) => setShowTokens(e.target.checked)}
          />
          Configure JWT Tokens (Optional)
        </label>
        {showTokens && (
          <>
            <button 
              type="button" 
              onClick={handleUseAuthToken}
              className="btn btn-secondary"
              style={{ marginBottom: '10px' }}
            >
              Use Auth Token for All APIs
            </button>
            
            <div style={{ display: 'grid', gap: '10px' }}>
              {Object.entries(tokens).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label style={{ width: '180px', fontSize: '0.9em' }}>
                    {key.replace('ApiToken', ' API')}:
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleTokenChange(key as keyof ApiTokens, e.target.value)}
                    placeholder="JWT token"
                    style={{ flex: 1, fontSize: '0.9em' }}
                    disabled={loading}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <button 
        onClick={handleFormApiCalls} 
        disabled={loading || !question.trim()}
        className="btn btn-primary"
      >
        {loading ? 'Forming API Calls...' : 'Form API Calls'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Analyzing your question and forming specific API calls...</p>
        </div>
      )}

      {formattedCalls && (
        <div style={{ marginTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#2c3e50', margin: 0 }}>
              📋 Formed API Calls
            </h3>
            <button
              onClick={copyCallsToClipboard}
              className="btn btn-secondary"
              style={{ fontSize: '0.9em' }}
            >
              📋 Copy
            </button>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            fontFamily: 'Consolas, Monaco, "Lucida Console", monospace',
            fontSize: '0.9em',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {formattedCalls}
          </div>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '6px', fontSize: '0.9em' }}>
            <strong>✅ API Calls Formation Complete</strong>
            <br />
            The system has determined the required routes and formed specific API calls with parameters needed to answer your question.
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryV2FormApiCallsTester;