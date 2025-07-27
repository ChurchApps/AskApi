import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface QueryV2AnswerTesterProps {
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

interface RouteDetail {
  service: string;
  method: string;
  path: string;
  summary: string;
}

interface AnswerResponse {
  answer: string;
  routes?: RouteDetail[];
  executionTime?: number;
  tokensUsed?: {
    input: number;
    output: number;
    total: number;
  };
}

const QueryV2AnswerTester: React.FC<QueryV2AnswerTesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [answerData, setAnswerData] = useState<AnswerResponse | null>(null);
  const [determinedRoutes, setDeterminedRoutes] = useState<RouteDetail[]>([]);
  const [tokens, setTokens] = useState<ApiTokens>({
    attendanceApiToken: '',
    contentApiToken: '',
    doingApiToken: '',
    givingApiToken: '',
    membershipApiToken: '',
    messagingApiToken: '',
    reportingApiToken: ''
  });

  // Sample questions that require data from APIs
  const sampleQuestions = [
    'How many staff members are at this church?',
    'What was our total attendance last Sunday?',
    'Who donated more than $100 this month?',
    'List all active groups with their leaders',
    'What sermons were preached in the last 30 days?',
    'How many new members joined this year?',
    'What are the upcoming events this week?',
    'Show me the giving trends for the past quarter',
    'List all volunteers scheduled for this Sunday',
    'How many baptisms have we had this year?'
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

  const handleAnswerQuestion = async () => {
    if (!question.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a question' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);
    setAnswerData(null);
    setDeterminedRoutes([]);

    const startTime = Date.now();

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
        `${EnvironmentHelper.getAskApiUrl()}/queryV2/answerQuestion`,
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

      const executionTime = Date.now() - startTime;

      // Process the response
      let processedAnswer: AnswerResponse = {
        answer: '',
        executionTime: executionTime / 1000
      };

      // Extract answer and routes from response
      if (response.data) {
        if (typeof response.data === 'string') {
          processedAnswer.answer = response.data;
        } else if (response.data.answer) {
          processedAnswer.answer = response.data.answer;
          processedAnswer.routes = response.data.routes;
          processedAnswer.tokensUsed = response.data.tokensUsed;
        } else if (response.data.data && response.data.data.answer) {
          processedAnswer.answer = response.data.data.answer;
          processedAnswer.routes = response.data.data.routes;
        } else {
          // Try to extract meaningful content from the response
          processedAnswer.answer = JSON.stringify(response.data, null, 2);
        }

        // Try to extract routes from the answer if they're embedded
        if (!processedAnswer.routes && processedAnswer.answer.includes('Routes used:')) {
          // Parse routes from answer if present
          const routesMatch = processedAnswer.answer.match(/Routes used:([^]*?)(?=\n\n|$)/);
          if (routesMatch) {
            try {
              const routesText = routesMatch[1].trim();
              // Simple parsing - this would need to be more sophisticated in production
              const routesList = routesText.split('\n').filter(line => line.includes('-'));
              processedAnswer.routes = routesList.map(line => {
                const parts = line.split('-').map(p => p.trim());
                return {
                  service: 'unknown',
                  method: 'GET',
                  path: parts[0] || '',
                  summary: parts[1] || ''
                };
              });
            } catch (e) {
              console.log('Could not parse routes from answer');
            }
          }
        }
      }

      setAnswerData(processedAnswer);

      setResponse({
        status: response.status,
        data: response.data,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      const executionTime = Date.now() - startTime;
      
      setResponse({
        status: error.response?.status || 500,
        data: error.response?.data || { error: error.message },
        timestamp: new Date().toISOString()
      });

      // Still show partial results if available
      if (error.response?.data?.answer) {
        setAnswerData({
          answer: error.response.data.answer,
          executionTime: executionTime / 1000
        });
      }
    } finally {
      setLoading(false);
    }
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
      <h2 className="section-title">🎯 Answer Question API (QueryV2)</h2>
      <p>Get natural language answers to questions about your church data using AI-powered analysis</p>

      <div className="info-box">
        ℹ️ This endpoint analyzes your question, determines the required API routes, fetches the data, and provides a natural language answer.
      </div>

      <div className="form-group">
        <label htmlFor="question">Your Question:</label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., How many staff members are at this church?"
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
        onClick={handleAnswerQuestion} 
        disabled={loading || !question.trim()}
        className="btn btn-primary"
      >
        {loading ? 'Getting Answer...' : 'Get Answer'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Analyzing your question and gathering data...</p>
        </div>
      )}

      {answerData && (
        <div style={{ marginTop: '25px' }}>
          <div className="answer-section" style={{
            backgroundColor: '#f0f7ff',
            border: '1px solid #3498db',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '15px' }}>
              💬 Answer
            </h3>
            <div style={{
              fontSize: '1.1em',
              lineHeight: '1.6',
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>
              {answerData.answer}
            </div>
          </div>

          {answerData.executionTime && (
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '15px',
              fontSize: '0.9em',
              color: '#666'
            }}>
              <span>⏱️ Execution Time: {answerData.executionTime.toFixed(2)}s</span>
              {answerData.tokensUsed && (
                <>
                  <span>📊 Input Tokens: {answerData.tokensUsed.input}</span>
                  <span>📊 Output Tokens: {answerData.tokensUsed.output}</span>
                </>
              )}
            </div>
          )}

          {answerData.routes && answerData.routes.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                🛠️ API Routes Used ({answerData.routes.length})
              </h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {answerData.routes.map((route, index) => (
                  <div
                    key={index}
                    style={{
                      border: '1px solid #e1e8ed',
                      borderRadius: '6px',
                      padding: '10px',
                      backgroundColor: '#fff',
                      borderLeft: `3px solid ${serviceColors[route.service.toLowerCase()] || '#95a5a6'}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          fontSize: '0.75em',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: getMethodColor(route.method)
                        }}
                      >
                        {route.method.toUpperCase()}
                      </span>
                      <code style={{ 
                        fontSize: '0.85em', 
                        backgroundColor: '#f8f9fa', 
                        padding: '2px 4px', 
                        borderRadius: '3px'
                      }}>
                        {route.path}
                      </code>
                      <span style={{
                        fontSize: '0.75em',
                        color: serviceColors[route.service.toLowerCase()] || '#95a5a6',
                        marginLeft: 'auto'
                      }}>
                        {getServiceDisplayName(route.service)}
                      </span>
                    </div>
                    {route.summary && (
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.8em', color: '#666' }}>
                        {route.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showRawResponse}
                onChange={(e) => setShowRawResponse(e.target.checked)}
              />
              Show Raw Response
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryV2AnswerTester;