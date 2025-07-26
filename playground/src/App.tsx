import React, { useState, useEffect } from 'react';
import './App.css';
import AuthSection from './components/AuthSection';
import QuestionsAPI from './components/QuestionsAPI';
import QueryAPI from './components/QueryAPI';
import ResponseViewer from './components/ResponseViewer';
import { UserHelper, ApiHelper } from './helpers/ApiHelper';
import { EnvironmentHelper } from './helpers/EnvironmentHelper';
import { UserContextProvider } from './contexts/UserContext';

export interface AuthConfig {
  churchId: string;
  authToken: string;
  isAuthenticated: boolean;
  church?: any;
  user?: any;
}

export interface APIResponse {
  status: number;
  data: any;
  timestamp: string;
}

function App() {
  const [auth, setAuth] = useState<AuthConfig>({ 
    churchId: '', 
    authToken: '', 
    isAuthenticated: false 
  });
  const [response, setResponse] = useState<APIResponse | null>(null);

  useEffect(() => {
    // Initialize environment and API configurations
    EnvironmentHelper.init();
    
    // Check if user is already logged in from previous session
    const currentUserChurch = UserHelper.currentUserChurch;
    if (currentUserChurch?.jwt && currentUserChurch?.church) {
      // Set API authentication
      ApiHelper.setDefaultPermissions(currentUserChurch.jwt);
      
      setAuth({
        churchId: currentUserChurch.church.id,
        authToken: currentUserChurch.jwt,
        isAuthenticated: true,
        church: currentUserChurch.church,
        user: currentUserChurch
      });
    }
  }, []);

  const handleAuthChange = (newAuth: AuthConfig) => {
    setAuth(newAuth);
  };

  return (
    <UserContextProvider>
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
          <AuthSection auth={auth} setAuth={handleAuthChange} />
          {auth.isAuthenticated && (
            <>
              <QuestionsAPI auth={auth} setResponse={setResponse} />
              <QueryAPI auth={auth} setResponse={setResponse} />
            </>
          )}
          {response && <ResponseViewer response={response} />}
        </main>
      </div>
    </UserContextProvider>
  );
}

export default App;