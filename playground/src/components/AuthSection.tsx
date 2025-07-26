import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { LoginPage } from '@churchapps/apphelper-login';

const AuthSection: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const userContext = useUserContext();
  const { userChurch } = userContext;

  const handleLoginSuccess = (redirectUrl?: string) => {
    // Login is successful when userChurch has a JWT
    // The LoginPage component will have already updated the context
    setShowLogin(false);
  };

  // User is authenticated if userChurch has a JWT
  const isAuthenticated = !!(userChurch && userChurch.jwt);

  if (showLogin) {
    return (
      <div className="section">
        <div className="section-title">🔐 Authentication</div>
        <LoginPage
          context={userContext}
          jwt=""
          auth=""
          keyName=""
          appName="AskApi Playground"
          appUrl={window.location.origin}
          returnUrl="/"
          handleRedirect={handleLoginSuccess}
          showLogo={false}
        />

        <div style={{ marginTop: '15px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLogin(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="section">
        <div className="section-title">🔐 Authentication</div>
        <div className="info-box">
          Please log in with your ChurchApps account to access the AskApi playground.
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowLogin(true)}
        >
          Login with ChurchApps
        </button>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-title">🔐 Authentication</div>
      <div className="info-box" style={{ backgroundColor: '#27ae60' }}>
        ✅ Successfully authenticated as <strong>{userChurch.person?.name?.display || userChurch.person?.contactInfo?.email}</strong>
        {userChurch.church?.name && <> at <strong>{userChurch.church.name}</strong></>}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Church</label>
          <input
            type="text"
            value={userChurch.church?.name || 'No church selected'}
            disabled
            style={{ backgroundColor: '#f8f9fa' }}
          />
        </div>

        <div className="form-group">
          <label>Church ID</label>
          <input
            type="text"
            value={userChurch.church?.id || ''}
            disabled
            style={{ backgroundColor: '#f8f9fa' }}
          />
        </div>
      </div>

      {/* Display JWT tokens for all APIs */}
      {userChurch?.apis && userChurch.apis.length > 0 && (
        <div className="api-tokens-section">
          <h4>API JWT Tokens</h4>
          <div className="api-tokens-grid">
            {userChurch.apis.map((api: any, index: number) => (
              <div key={index} className="api-token-item">
                <div className="api-token-header">
                  <strong>{api.keyName}</strong>
                  <span className="permission-count">
                    ({api.permissions?.length || 0} permissions)
                  </span>
                </div>
                <input
                  type="text"
                  value={api.jwt ? `${api.jwt.substring(0, 40)}...` : 'No token'}
                  disabled
                  style={{
                    backgroundColor: '#f8f9fa',
                    fontFamily: 'monospace',
                    fontSize: '0.75em',
                    width: '100%',
                    marginTop: '5px'
                  }}
                />
                {api.permissions && api.permissions.length > 0 && (
                  <div className="permissions-list">
                    <small>Permissions: {api.permissions.slice(0, 3).map((p: any) => p.action).join(', ')}
                      {api.permissions.length > 3 && ` +${api.permissions.length - 3} more`}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};

export default AuthSection;