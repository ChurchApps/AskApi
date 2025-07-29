import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface QueryV2TesterProps {
  setResponse: (response: APIResponse) => void;
}

interface Route {
  service: string;
  method: string;
  path: string;
  summary: string;
  requiresAuth: boolean;
  routeKey: string;
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

const QueryV2Tester: React.FC<QueryV2TesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [question, setQuestion] = useState('');
  const [routes, setRoutes] = useState<Route[]>([]);
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

  // Sample questions for testing route determination
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

  // Service color mapping for visual distinction
  const serviceColors: { [key: string]: string } = {
    'membershipapi': '#3498db',
    'attendanceapi': '#2ecc71',
    'givingapi': '#f39c12',
    'contentapi': '#9b59b6',
    'doingapi': '#e74c3c',
    'messagingapi': '#1abc9c',
    'reportingapi': '#34495e'
  };

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

  const handleGetRoutes = async () => {
    if (!question.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a question' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);
    setRoutes([]);

    try {
      // Prepare JWT tokens object
      const jwts = {
        attendanceapi: tokens.attendanceApiToken || userChurch?.jwt || '',
        contentapi: tokens.contentApiToken || userChurch?.jwt || '',
        doingapi: tokens.doingApiToken || userChurch?.jwt || '',
        givingapi: tokens.givingApiToken || userChurch?.jwt || '',
        membershipapi: tokens.membershipApiToken || userChurch?.jwt || '',
        messagingapi: tokens.messagingApiToken || userChurch?.jwt || '',
        reportingapi: tokens.reportingApiToken || userChurch?.jwt || ''
      };

      const response = await axios.post(
        `${EnvironmentHelper.getAskApiUrl()}/queryV2/getRoutes`,
        {
          question,
          jwts
        },
        {
          headers: {
            'Authorization': `Bearer ${userChurch?.jwt || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Extract routes from the response data
      let routesData: Route[] = [];
      if (response.data && Array.isArray(response.data)) {
        routesData = response.data;
      } else if (response.data.routes && Array.isArray(response.data.routes)) {
        routesData = response.data.routes;
      } else if (response.data.answer) {
        // If response is wrapped, try to parse the answer
        try {
          const parsed = JSON.parse(response.data.answer);
          if (Array.isArray(parsed)) {
            routesData = parsed;
          }
        } catch (e) {
          console.log('Could not parse answer as JSON, using full response');
        }
      }

      setRoutes(routesData);

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

  const copyRoutesToClipboard = () => {
    const routesJson = JSON.stringify(routes, null, 2);
    navigator.clipboard.writeText(routesJson).then(() => {
      alert('Routes copied to clipboard!');
    });
  };

  const getServiceDisplayName = (service: string): string => {
    return service.replace('api', ' API').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getMethodColor = (method: string): string => {
    switch (method.toUpperCase()) {
      case 'GET': return '#2ecc71';
      case 'POST': return '#3498db';
      case 'PUT': return '#f39c12';
      case 'DELETE': return '#e74c3c';
      case 'PATCH': return '#9b59b6';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">🔍 Route Discovery API (QueryV2)</h2>
      <p>Discover which API routes are needed to answer specific questions using OpenAI analysis</p>

      <div className="info-box">
        ℹ️ This endpoint uses OpenAI to analyze your question and determine which specific API routes would be needed to gather the required data.
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
        onClick={handleGetRoutes} 
        disabled={loading || !question.trim()}
        className="btn btn-primary"
      >
        {loading ? 'Analyzing Routes...' : 'Discover Routes'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Analyzing your question to determine required API routes...</p>
        </div>
      )}

      {routes.length > 0 && (
        <div style={{ marginTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#2c3e50', margin: 0 }}>
              📋 Discovered Routes ({routes.length})
            </h3>
            <button
              onClick={copyRoutesToClipboard}
              className="btn btn-secondary"
              style={{ fontSize: '0.9em' }}
            >
              📋 Copy JSON
            </button>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {routes.map((route, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #e1e8ed',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: '#fff',
                  borderLeft: `4px solid ${serviceColors[route.service.toLowerCase()] || '#95a5a6'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8em',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: getMethodColor(route.method),
                        marginRight: '10px'
                      }}
                    >
                      {route.method.toUpperCase()}
                    </span>
                    <code style={{ 
                      fontSize: '0.9em', 
                      backgroundColor: '#f8f9fa', 
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      color: '#495057'
                    }}>
                      {route.path}
                    </code>
                  </div>
                  <span
                    style={{
                      fontSize: '0.8em',
                      fontWeight: 'bold',
                      color: serviceColors[route.service.toLowerCase()] || '#95a5a6'
                    }}
                  >
                    {getServiceDisplayName(route.service)}
                  </span>
                </div>

                <p style={{ margin: '8px 0', color: '#555', fontSize: '0.9em' }}>
                  {route.summary}
                </p>

                <div style={{ display: 'flex', gap: '15px', fontSize: '0.8em', color: '#6c757d' }}>
                  <span>
                    🔒 Auth Required: {route.requiresAuth ? 'Yes' : 'No'}
                  </span>
                  {route.routeKey && (
                    <span>
                      🔑 Route Key: <code>{route.routeKey}</code>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px', fontSize: '0.9em' }}>
            <strong>Services Summary:</strong>
            {Array.from(new Set(routes.map(r => r.service))).map(service => (
              <span
                key={service}
                style={{
                  display: 'inline-block',
                  margin: '5px 10px 5px 0',
                  padding: '3px 8px',
                  backgroundColor: serviceColors[service.toLowerCase()] || '#95a5a6',
                  color: 'white',
                  borderRadius: '3px',
                  fontSize: '0.8em'
                }}
              >
                {getServiceDisplayName(service)} ({routes.filter(r => r.service === service).length})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryV2Tester;