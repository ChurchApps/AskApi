// API helper implementation following AppHelper patterns

export interface ApiConfig {
  keyName: string;
  url: string;
  jwt: string;
  permissionsWithoutChurch?: string[];
}

export class ApiHelper {
  static apiConfigs: ApiConfig[] = [];
  static isAuthenticated = false;

  static getConfig(apiName: string): ApiConfig {
    const config = this.apiConfigs.find(c => c.keyName === apiName);
    if (!config) throw new Error(`API config not found: ${apiName}`);
    return config;
  }

  static setDefaultPermissions(jwt: string) {
    // Set JWT for all API configs
    this.apiConfigs.forEach(config => {
      config.jwt = jwt;
    });
    this.isAuthenticated = !!jwt;
  }

  static clearAuthentication() {
    this.apiConfigs.forEach(config => {
      config.jwt = "";
    });
    this.isAuthenticated = false;
  }

  static async postAnonymous(path: string, data: any, apiName: string) {
    const config = this.getConfig(apiName);

    const response = await fetch(config.url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    // Handle ChurchApps API error format
    if (!response.ok && result.errors) {
      throw new Error(result.errors[0] || 'API request failed');
    }

    return result;
  }

  static async post(path: string, data: any, apiName: string) {
    const config = this.getConfig(apiName);
    if (!config.jwt) throw new Error('Authentication required');

    const response = await fetch(config.url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.jwt}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok && result.errors) {
      throw new Error(result.errors[0] || 'API request failed');
    }

    return result;
  }

  static async get(path: string, apiName: string) {
    const config = this.getConfig(apiName);
    if (!config.jwt) throw new Error('Authentication required');

    const response = await fetch(config.url + path, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.jwt}`,
      },
    });

    const result = await response.json();
    
    if (!response.ok && result.errors) {
      throw new Error(result.errors[0] || 'API request failed');
    }

    return result;
  }

  static async put(path: string, data: any, apiName: string) {
    const config = this.getConfig(apiName);
    if (!config.jwt) throw new Error('Authentication required');

    const response = await fetch(config.url + path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.jwt}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok && result.errors) {
      throw new Error(result.errors[0] || 'API request failed');
    }

    return result;
  }

  static async delete(path: string, apiName: string) {
    const config = this.getConfig(apiName);
    if (!config.jwt) throw new Error('Authentication required');

    const response = await fetch(config.url + path, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${config.jwt}`,
      },
    });

    if (!response.ok) {
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0] || 'API request failed');
      }
    }

    return response.status === 204 ? {} : response.json();
  }
}

export class UserHelper {
  private static USER_KEY = 'churchapps_user';
  private static USER_CHURCH_KEY = 'churchapps_user_church';

  static get currentUser() {
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  static set currentUser(user: any) {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static get currentUserChurch() {
    const stored = localStorage.getItem(this.USER_CHURCH_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  static set currentUserChurch(userChurch: any) {
    if (userChurch) {
      localStorage.setItem(this.USER_CHURCH_KEY, JSON.stringify(userChurch));
    } else {
      localStorage.removeItem(this.USER_CHURCH_KEY);
    }
  }

  static logout() {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.USER_CHURCH_KEY);
  }
}