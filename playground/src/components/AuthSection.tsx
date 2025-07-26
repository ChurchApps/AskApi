import React, { useState } from 'react';
import { AuthConfig } from '../App';
import { UserHelper, ApiHelper } from '@churchapps/apphelper';
import { useUserContext, useUserContextLogout } from '../contexts/UserContext';
import { LoginPage } from '@churchapps/apphelper-login';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';

interface AuthSectionProps {
  auth: AuthConfig;
  setAuth: (auth: AuthConfig) => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ auth, setAuth }) => {
  const [showLogin, setShowLogin] = useState(false);
  const userContext = useUserContext();

  const handleLoginSuccess = (redirectUrl?: string) => {
    // Check if userChurch has valid data (non-empty jwt indicates successful login)
    console.log(userContext.userChurch);
    if (userContext.userChurch && userContext.userChurch.jwt) {
      // Set the JWT for API calls
      ApiHelper.setDefaultPermissions(userContext.userChurch.jwt);

      // Update auth state
      setAuth({
        churchId: userContext.userChurch.church.id || '',
        authToken: userContext.userChurch.jwt,
        isAuthenticated: true,
        church: userContext.userChurch.church,
        user: userContext.userChurch
      });

      // Store in UserHelper for persistence
      UserHelper.currentUserChurch = userContext.userChurch;
    }
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <div className="section">
        <div className="section-title">🔐 Authentication</div>
        <LoginPage
          context={userContext}
          jwt=""
          auth={""}
          keyName=""
          appName="AskApi Playground"
          appUrl={window.location.origin}
          returnUrl="/"
          handleRedirect={handleLoginSuccess}
          showLogo={true}
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

  if (!auth.isAuthenticated) {
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
        ✅ Successfully authenticated as <strong>{auth.user?.displayName || auth.user?.email}</strong>
        {auth.church?.name && <> at <strong>{auth.church.name}</strong></>}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Church</label>
          <input
            type="text"
            value={auth.church?.name || 'No church selected'}
            disabled
            style={{ backgroundColor: '#f8f9fa' }}
          />
        </div>

        <div className="form-group">
          <label>Church ID</label>
          <input
            type="text"
            value={auth.churchId}
            disabled
            style={{ backgroundColor: '#f8f9fa' }}
          />
        </div>

        <div className="form-group">
          <label>JWT Token</label>
          <input
            type="text"
            value={auth.authToken ? `${auth.authToken.substring(0, 30)}...` : ''}
            disabled
            style={{ backgroundColor: '#f8f9fa', fontFamily: 'monospace', fontSize: '0.85em' }}
          />
        </div>
      </div>


    </div>
  );
};

export default AuthSection;