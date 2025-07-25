import React, { useState } from 'react';
import './App.css';
import AuthSection from './components/AuthSection';
import QuestionsAPI from './components/QuestionsAPI';
import QueryAPI from './components/QueryAPI';
import ResponseViewer from './components/ResponseViewer';

export interface AuthConfig {
  churchId: string;
  authToken: string;
}

export interface APIResponse {
  status: number;
  data: any;
  timestamp: string;
}

function App() {
  const [auth, setAuth] = useState<AuthConfig>({ churchId: '', authToken: '' });
  const [response, setResponse] = useState<APIResponse | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔬 AskApi Playground</h1>
        <p>Development testing interface for AskApi endpoints</p>
      </header>

      <main className="App-main">
        <AuthSection auth={auth} setAuth={setAuth} />
        <QuestionsAPI auth={auth} setResponse={setResponse} />
        <QueryAPI auth={auth} setResponse={setResponse} />
        {response && <ResponseViewer response={response} />}
      </main>
    </div>
  );
}

export default App;