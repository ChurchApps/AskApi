import React, { useEffect, useState } from 'react';
import './App.css';
import AuthSection from './components/AuthSection';
import QuestionsAPI from './components/QuestionsAPI';
import QueryAPI from './components/QueryAPI';
import AskAPI from './components/AskAPI';
import EnhancedQueryAPI from './components/EnhancedQueryAPI';
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
            <EnhancedQueryAPI setResponse={setResponse} />
            <AskAPI setResponse={setResponse} />
            <QuestionsAPI setResponse={setResponse} />
            <QueryAPI setResponse={setResponse} />
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