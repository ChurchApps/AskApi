import React from 'react';
import { AuthConfig } from '../App';

interface AuthSectionProps {
  auth: AuthConfig;
  setAuth: (auth: AuthConfig) => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ auth, setAuth }) => {
  return (
    <div className="section">
      <div className="section-title">🔐 Authentication</div>
      <div className="info-box">
        This playground requires valid authentication. Use your church credentials to get started.
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="churchId">Church ID</label>
          <input
            type="text"
            id="churchId"
            placeholder="Enter your church ID"
            value={auth.churchId}
            onChange={(e) => setAuth({ ...auth, churchId: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="authToken">Auth Token (JWT)</label>
          <input
            type="text"
            id="authToken"
            placeholder="Enter your JWT token"
            value={auth.authToken}
            onChange={(e) => setAuth({ ...auth, authToken: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthSection;