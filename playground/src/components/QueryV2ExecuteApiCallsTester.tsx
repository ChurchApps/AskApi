import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface QueryV2ExecuteApiCallsTesterProps {
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


const QueryV2ExecuteApiCallsTester: React.FC<QueryV2ExecuteApiCallsTesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [question, setQuestion] = useState('');
  const [executionResults, setExecutionResults] = useState<string[]>([]);
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

  // Sample questions for testing API execution
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

  const handleExecuteApiCalls = async () => {
    if (!question.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a question' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);
    setExecutionResults([]);

    try {
      // Prepare JWT tokens object
      const jwts = {
        attendanceApiToken: tokens.attendanceApiToken || userChurch?.jwt || '',
        contentApiToken: tokens.contentApiToken || userChurch?.jwt || '',
        doingApiToken: tokens.doingApiToken || userChurch?.jwt || '',
        givingApiToken: tokens.givingApiToken || userChurch?.jwt || '',
        membershipApiToken: tokens.membershipApiToken || userChurch?.jwt || '',
        messagingApiToken: tokens.messagingApiToken || userChurch?.jwt || '',
        reportingApiToken: tokens.reportingApiToken || userChurch?.jwt || ''
      };

      const response = await axios.post(
        `${EnvironmentHelper.getAskApiUrl()}/queryV2/executeApiCalls`,
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

      // Extract the execution results from the response (now CSV strings)
      let resultsData: string[] = [];
      if (Array.isArray(response.data)) {
        resultsData = response.data;
      } else if (response.data.results && Array.isArray(response.data.results)) {
        resultsData = response.data.results;
      } else if (response.data.answer) {
        // If response is wrapped, try to parse the answer
        try {
          const parsed = JSON.parse(response.data.answer);
          if (Array.isArray(parsed)) {
            resultsData = parsed;
          }
        } catch (e) {
          console.log('Could not parse answer as JSON, using full response');
          resultsData = [String(response.data)];
        }
      } else {
        resultsData = [String(response.data)];
      }

      setExecutionResults(resultsData);

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

  const copyResultsToClipboard = () => {
    const resultsJson = JSON.stringify(executionResults, null, 2);
    navigator.clipboard.writeText(resultsJson).then(() => {
      alert('Execution results copied to clipboard!');
    });
  };

  const getTotalItemCount = () => {
    return executionResults.reduce((total, csvData) => {
      if (csvData) {
        // Count lines minus header = number of data rows
        const lines = csvData.split('\n').filter(line => line.trim());
        return total + Math.max(0, lines.length - 1);
      }
      return total;
    }, 0);
  };

  const getCsvPreview = (csvData: string, maxLines: number = 10): string => {
    if (!csvData) return '';
    const lines = csvData.split('\n');
    if (lines.length <= maxLines) return csvData;
    return lines.slice(0, maxLines).join('\n') + `\n... (${lines.length - maxLines} more rows)`;
  };



  return (
    <div className="section">
      <h2 className="section-title">🚀 API Execution (QueryV2)</h2>
      <p>Execute the formed API calls with appropriate tokens and return actual data in CSV format</p>

      <div className="info-box">
        ℹ️ This endpoint forms API calls based on your question, then executes them with the provided JWT tokens to return real data from the APIs in CSV format for optimal token efficiency.
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
          Configure JWT Tokens (Required for execution)
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
        onClick={handleExecuteApiCalls}
        disabled={loading || !question.trim()}
        className="btn btn-primary"
      >
        {loading ? 'Executing API Calls...' : 'Execute API Calls'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Forming API calls and executing them with your tokens...</p>
        </div>
      )}

      {executionResults.length > 0 && (
        <div style={{ marginTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#2c3e50', margin: 0 }}>
              📊 Execution Results ({executionResults.length} API calls, {getTotalItemCount()} total items)
            </h3>
            <button
              onClick={copyResultsToClipboard}
              className="btn btn-secondary"
              style={{ fontSize: '0.9em' }}
            >
              📋 Copy JSON
            </button>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {executionResults.map((csvData, index) => {
              const lines = csvData ? csvData.split('\n').filter(line => line.trim()) : [];
              const itemCount = Math.max(0, lines.length - 1); // Subtract header row

              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid #e1e8ed',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#fff',
                    borderLeft: `4px solid #3498db`
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, color: '#2c3e50' }}>
                      API Call #{index + 1} Result
                    </h4>
                    <div style={{ fontSize: '0.9em', color: '#555', marginTop: '5px' }}>
                      <strong>Data Format:</strong> CSV ({itemCount} rows, {csvData ? csvData.length : 0} characters)
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.9em', color: '#333' }}>CSV Data:</strong>
                    <pre style={{
                      backgroundColor: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      borderRadius: '4px',
                      padding: '10px',
                      fontSize: '0.75em',
                      maxHeight: '300px',
                      overflow: 'auto',
                      marginTop: '5px',
                      fontFamily: 'Consolas, Monaco, "Lucida Console", monospace'
                    }}>
                      {csvData ? getCsvPreview(csvData, 15) : 'No data'}
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '6px', fontSize: '0.9em' }}>
            <strong>Execution Summary:</strong>
            <div style={{ marginTop: '5px' }}>
              📊 Total API Calls: {executionResults.length} |
              📋 Total Items Retrieved: {getTotalItemCount()} |
              💾 CSV Datasets: {executionResults.filter(csv => csv && csv.trim()).length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryV2ExecuteApiCallsTester;