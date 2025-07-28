import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface QueryPeopleTesterProps {
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

const QueryPeopleTester: React.FC<QueryPeopleTesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string[] | null>(null);
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

  // Sample queries for testing people search
  const sampleQueries = [
    'People who attend regularly but haven\'t given recently',
    'New members in the last 6 months',
    'High contributors who missed last Sunday',
    'Young adults in small groups',
    'People who volunteer frequently',
    'Members who haven\'t attended in over a month',
    'Top donors from this year',
    'People who joined a group recently',
    'Regular attendees with no recorded donations',
    'Adults without group memberships'
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

  const setQueryExample = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  const handleQueryPeople = async () => {
    if (!query.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a query' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);
    setResult(null);

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
        `${EnvironmentHelper.getAskApiUrl()}/query/people`,
        {
          question: query.trim(),
          jwts
        },
        {
          headers: {
            'Authorization': `Bearer ${userChurch?.jwt || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Parse the result - expecting a JSON array of person IDs
      let parsedResult: string[];
      if (typeof response.data === 'string') {
        try {
          parsedResult = JSON.parse(response.data);
        } catch (e) {
          // If parsing fails, treat as empty result
          parsedResult = [];
        }
      } else if (Array.isArray(response.data)) {
        parsedResult = response.data;
      } else {
        parsedResult = [];
      }

      setResult(parsedResult);

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

  const copyResultToClipboard = () => {
    if (result) {
      const resultJson = JSON.stringify(result, null, 2);
      navigator.clipboard.writeText(resultJson).then(() => {
        alert('Result copied to clipboard!');
      });
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">👥 People Query API</h2>
      <p>Natural language search for people based on attendance, donations, and other criteria</p>

      <div className="info-box">
        ℹ️ This endpoint uses AI to analyze your natural language query and return a list of people IDs that match your criteria, considering attendance patterns, donation history, group memberships, and more.
      </div>

      <div className="form-group">
        <label htmlFor="query">Search Query:</label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., People who attend regularly but haven't given recently"
          style={{ width: '100%' }}
          disabled={loading}
        />
      </div>

      <div className="query-examples">
        <label>Sample Queries:</label>
        <div className="example-tags">
          {sampleQueries.map((sampleQuery, index) => (
            <button
              key={index}
              className="example-tag"
              onClick={() => setQueryExample(sampleQuery)}
            >
              {sampleQuery}
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
        onClick={handleQueryPeople} 
        disabled={loading || !query.trim()}
        className="btn btn-primary"
      >
        {loading ? 'Searching People...' : 'Search People'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Analyzing your query to find matching people...</p>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#2c3e50', margin: 0 }}>
              🔍 Search Results ({result.length} people found)
            </h3>
            <button
              onClick={copyResultToClipboard}
              className="btn btn-secondary"
              style={{ fontSize: '0.9em' }}
            >
              📋 Copy JSON
            </button>
          </div>

          <div style={{
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#fff'
          }}>
            <div>
              <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Matching People IDs:</h4>
              {result.length > 0 ? (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '6px'
                }}>
                  {result.map((personId, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.9em',
                        fontWeight: 'bold'
                      }}
                    >
                      ID: {personId}
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '6px',
                  padding: '15px',
                  textAlign: 'center',
                  color: '#856404'
                }}>
                  <span style={{ fontSize: '1.5em', marginBottom: '10px', display: 'block' }}>🔍</span>
                  No people found matching your criteria
                </div>
              )}
            </div>
          </div>

          <div style={{ 
            marginTop: '15px', 
            padding: '10px', 
            backgroundColor: '#e8f4fd', 
            borderRadius: '6px', 
            fontSize: '0.9em',
            color: '#1e6091'
          }}>
            <strong>💡 Tip:</strong> These person IDs can be used with other APIs to get detailed information about each person, their attendance history, donation records, and group memberships.
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryPeopleTester;