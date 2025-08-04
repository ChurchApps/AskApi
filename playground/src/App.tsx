import React, { useEffect, useState } from 'react';
import './App.css';
import AuthSection from './components/AuthSection';
import QueryV2Tester from './components/QueryV2Tester';
import QueryV2AnswerTester from './components/QueryV2AnswerTester';
import QueryV2FormApiCallsTester from './components/QueryV2FormApiCallsTester';
import QueryV2ExecuteApiCallsTester from './components/QueryV2ExecuteApiCallsTester';
import QueryPeopleTester from './components/QueryPeopleTester';
import PeopleAdvancedSearchTester from './components/PeopleAdvancedSearchTester';
import WebsiteCreationTester from './components/WebsiteCreationTester';
import ResponseViewer from './components/ResponseViewer';
import { EnvironmentHelper } from './helpers/EnvironmentHelper';
import { UserContextProvider, useUserContext } from './contexts/UserContext';

export interface APIResponse {
  status: number;
  data: any;
  timestamp: string;
}

function AppContent() {
  const { userChurch } = useUserContext();
  const [response, setResponse] = useState<APIResponse | null>(null);

  useEffect(() => {
    EnvironmentHelper.init();
  }, []);

  // User is authenticated if userChurch has a JWT
  const isAuthenticated = !!(userChurch && userChurch.jwt);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔬 AskApi Playground</h1>
        <p>Development testing interface for AskApi endpoints</p>
        <div style={{ fontSize: '0.8em', color: '#7f8c8d', marginTop: '10px' }}>
          Environment: {process.env.REACT_APP_STAGE || process.env.NODE_ENV || 'development'} |
          MembershipApi: {EnvironmentHelper.getMembershipApiUrl()} |
          AskApi: {EnvironmentHelper.getAskApiUrl()}
        </div>
      </header>

      <main className="App-main">
        <AuthSection />
        {isAuthenticated && (
          <>
            <WebsiteCreationTester setResponse={setResponse} />
            <PeopleAdvancedSearchTester setResponse={setResponse} />
            <QueryPeopleTester setResponse={setResponse} />
            <QueryV2AnswerTester setResponse={setResponse} />
            <QueryV2ExecuteApiCallsTester setResponse={setResponse} />
            <QueryV2FormApiCallsTester setResponse={setResponse} />
            <QueryV2Tester setResponse={setResponse} />
          </>
        )}
        {response && <ResponseViewer response={response} />}
      </main>
    </div>
  );
}

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

export default App;