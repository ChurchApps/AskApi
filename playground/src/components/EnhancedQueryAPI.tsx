import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface EnhancedQueryAPIProps {
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

// TypeScript interfaces for enhanced query response structure
// interface ExecutionMetrics {
//   classification: {
//     intent: string;
//     entities: any[];
//     processingTime: number;
//   };
//   routeSelection: {
//     selectedRoute: string;
//     confidence: number;
//     processingTime: number;
//   };
//   dataProcessing: {
//     totalRecords: number;
//     relevantRecords: number;
//     processingTime: number;
//   };
//   aiProcessing: {
//     tokensUsed: number;
//     processingTime: number;
//   };
//   totalExecutionTime: number;
// }

// interface TokenComparison {
//   enhanced: number;
//   traditional: number;
//   savings: number;
//   percentSaved: number;
// }

// Interface for the enhanced query response
// interface EnhancedResponse {
//   question: string;
//   answer: string;
//   confidence: number;
//   executionMetrics: ExecutionMetrics;
//   tokenComparison: TokenComparison;
// }

const EnhancedQueryAPI: React.FC<EnhancedQueryAPIProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [question, setQuestion] = useState('');
  const [tokens, setTokens] = useState<ApiTokens>({
    attendanceApiToken: '',
    contentApiToken: '',
    doingApiToken: '',
    givingApiToken: '',
    membershipApiToken: '',
    messagingApiToken: '',
    reportingApiToken: ''
  });
  const [loading, setLoading] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [useEnhanced, setUseEnhanced] = useState(true);

  // Sample queries demonstrating the enhanced processing capabilities
  const sampleQueries = [
    {
      label: "Attendance Analysis",
      query: "How many people attended church services last month?",
      description: "Tests attendance data retrieval and aggregation"
    },
    {
      label: "People Search",
      query: "Show me all members with email addresses from the Johnson family",
      description: "Tests people filtering and relationship queries"
    },
    {
      label: "Giving Report",
      query: "What was the total donation amount for the building fund this year?",
      description: "Tests financial data analysis and fund-specific queries"
    }
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

  const handleSampleQuery = (query: string) => {
    setQuestion(query);
  };

  const handleEnhancedQuery = async () => {
    if (!question.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a question' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);

    try {
      const endpoint = useEnhanced ? '/query/enhanced-ask' : '/query/ask';
      const response = await axios.post(
        `${EnvironmentHelper.getAskApiUrl()}${endpoint}`,
        {
          question,
          tokens
        },
        {
          headers: {
            'Authorization': `Bearer ${userChurch?.jwt || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

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

  // Use the userChurch JWT token for all APIs by default if tokens are not provided
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

  // Helper functions for formatting (metrics now displayed in ResponseViewer)
  // const formatDuration = (ms: number): string => {
  //   if (ms < 1000) return `${ms.toFixed(0)}ms`;
  //   return `${(ms / 1000).toFixed(2)}s`;
  // };

  return (
    <div className="section">
      <h2 className="section-title">🚀 Enhanced AI Query System</h2>
      <p>Experience optimized AI processing with intelligent route selection, data filtering, and token efficiency.</p>

      <div className="info-box">
        💡 The enhanced system uses intelligent classification and route selection to dramatically reduce token usage while maintaining accuracy. 
        Try the sample queries to see performance improvements in action!
      </div>

      {/* Processing Mode Toggle */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={useEnhanced}
            onChange={(e) => setUseEnhanced(e.target.checked)}
          />
          Use Enhanced Processing (recommended)
        </label>
        {!useEnhanced && (
          <small style={{ color: '#e67e22', fontStyle: 'italic' }}>
            Traditional processing will use more tokens and may be slower
          </small>
        )}
      </div>

      {/* Sample Queries */}
      <div className="query-examples">
        <label>Sample Queries:</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
          {sampleQueries.map((sample, index) => (
            <div key={index} style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '6px', 
              padding: '12px',
              background: '#f8f9fa'
            }}>
              <div style={{ fontWeight: '600', color: '#3498db', marginBottom: '5px' }}>
                {sample.label}
              </div>
              <div style={{ fontSize: '0.9em', marginBottom: '8px' }}>
                "{sample.query}"
              </div>
              <div style={{ fontSize: '0.8em', color: '#6c757d', marginBottom: '8px' }}>
                {sample.description}
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => handleSampleQuery(sample.query)}
                style={{ fontSize: '0.8em', padding: '6px 12px' }}
              >
                Try This Query
              </button>
            </div>
          ))}
        </div>
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

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={showTokens}
            onChange={(e) => setShowTokens(e.target.checked)}
          />
          Configure API Tokens (Optional)
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
        onClick={handleEnhancedQuery} 
        disabled={loading || !question.trim()}
        className={useEnhanced ? "btn btn-success" : "btn btn-primary"}
      >
        {loading ? 'Processing...' : useEnhanced ? '🚀 Ask Enhanced' : '🤖 Ask Traditional'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>{useEnhanced ? 'Enhanced processing with intelligent optimization...' : 'Traditional processing...'}</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedQueryAPI;