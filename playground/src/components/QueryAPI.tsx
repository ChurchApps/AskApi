import React, { useState } from 'react';
import { AuthConfig, APIResponse } from '../App';
import { ApiHelper } from '@churchapps/apphelper';

interface QueryAPIProps {
  auth: AuthConfig;
  setResponse: (response: APIResponse) => void;
}

const QueryAPI: React.FC<QueryAPIProps> = ({ auth, setResponse }) => {
  const [queryText, setQueryText] = useState('');
  const [subDomain, setSubDomain] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const exampleQueries = [
    'Show me all questions about baptism',
    'Find answered questions from this month',
    'Questions with more than 100 input tokens',
    'Unanswered questions',
    'Questions that took more than 5 seconds to answer',
    'Questions containing the word "service"',
    'Recent questions from user123',
    'Questions answered yesterday',
  ];

  const setQueryExample = (query: string) => {
    setQueryText(query);
  };

  const sendQueryRequest = async () => {
    if (!auth.isAuthenticated || !auth.authToken) {
      alert('Please log in first');
      return;
    }

    if (!queryText) {
      alert('Please enter a query');
      return;
    }

    setLoading(true);

    const body: any = {
      text: queryText
    };

    if (subDomain) body.subDomain = subDomain;
    if (siteUrl) body.siteUrl = siteUrl;

    try {
      const data = await ApiHelper.post('/query/questions', body, 'AskApi');
      
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
      <div className="section-title">🤖 Natural Language Query API</div>
      
      <div className="warning-box">
        ⚠️ This feature requires OpenAI or OpenRouter API keys to be configured in your environment.
      </div>

      <div className="form-group">
        <label htmlFor="queryText">Natural Language Query</label>
        <textarea
          id="queryText"
          placeholder="Show me all questions about baptism"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
      </div>

      <div className="query-examples">
        <label>Example Queries:</label>
        <div className="example-tags">
          {exampleQueries.map((query, index) => (
            <button
              key={index}
              className="example-tag"
              onClick={() => setQueryExample(query)}
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="subDomain">Subdomain (optional)</label>
          <input
            type="text"
            id="subDomain"
            placeholder="your-church"
            value={subDomain}
            onChange={(e) => setSubDomain(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="siteUrl">Site URL (optional)</label>
          <input
            type="text"
            id="siteUrl"
            placeholder="https://your-church.com"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
          />
        </div>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={sendQueryRequest}
        disabled={loading}
      >
        {loading ? 'Processing Query...' : 'Send Query'}
      </button>
    </div>
  );
};

export default QueryAPI;