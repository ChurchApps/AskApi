import React, { useState } from 'react';
import axios from 'axios';
import { APIResponse } from '../App';
import { EnvironmentHelper } from '../helpers/EnvironmentHelper';
import { useUserContext } from '../contexts/UserContext';

interface WebsiteCreationTesterProps {
  setResponse: (response: APIResponse) => void;
}

interface WebsitePageData {
  title?: string;
  url?: string;
  description: string;
  churchId?: string;
}

interface WebsitePageResponse {
  id?: string;
  title: string;
  url: string;
  description: string;
  sections?: any[];
  metadata?: any;
  [key: string]: any;
}

const WebsiteCreationTester: React.FC<WebsiteCreationTesterProps> = ({ setResponse }) => {
  const { userChurch } = useUserContext();
  const [formData, setFormData] = useState<WebsitePageData>({
    description: '',
    churchId: '',
    title: '',
    url: ''
  });
  const [loading, setLoading] = useState(false);
  const [websiteData, setWebsiteData] = useState<WebsitePageResponse | null>(null);

  // Sample descriptions for testing
  const sampleDescriptions = [
    'A welcoming home page for our church with service times, contact information, and a brief history of our community',
    'An about us page highlighting our church mission, vision, pastoral team, and core beliefs',
    'A ministries page showcasing our youth programs, small groups, outreach activities, and volunteer opportunities',
    'An events page with upcoming services, special events, community activities, and seasonal celebrations',
    'A giving page explaining our stewardship principles and providing online donation options',
    'A contact page with location details, service schedules, staff directory, and contact forms'
  ];

  const handleInputChange = (field: keyof WebsitePageData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const setDescriptionExample = (exampleDescription: string) => {
    setFormData(prev => ({
      ...prev,
      description: exampleDescription
    }));
  };

  const handleCreatePage = async () => {
    if (!formData.description.trim()) {
      setResponse({
        status: 400,
        data: { error: 'Please enter a description for the website page' },
        timestamp: new Date().toISOString()
      });
      return;
    }

    setLoading(true);
    setWebsiteData(null);

    const startTime = Date.now();

    try {
      // Prepare the request payload
      const payload: WebsitePageData = {
        description: formData.description.trim(),
        ...(formData.churchId?.trim() && { churchId: formData.churchId.trim() }),
        ...(formData.title?.trim() && { title: formData.title.trim() }),
        ...(formData.url?.trim() && { url: formData.url.trim() })
      };

      const response = await axios.post(
        `${EnvironmentHelper.getAskApiUrl()}/website/createPage`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${userChurch?.jwt || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const executionTime = Date.now() - startTime;

      // Process the response
      let processedWebsiteData: WebsitePageResponse | null = null;

      if (response.data) {
        if (typeof response.data === 'object' && response.data.title) {
          // Direct website page response
          processedWebsiteData = response.data as WebsitePageResponse;
        } else if (response.data.data && response.data.data.title) {
          // Wrapped response
          processedWebsiteData = response.data.data as WebsitePageResponse;
        } else {
          // Try to extract meaningful content from the response
          processedWebsiteData = {
            title: 'Generated Website Page',
            url: formData.url || 'generated-page',
            description: formData.description,
            ...response.data
          };
        }
      }

      setWebsiteData(processedWebsiteData);

      setResponse({
        status: response.status,
        data: {
          ...response.data,
          executionTime: executionTime / 1000
        },
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      const executionTime = Date.now() - startTime;

      setResponse({
        status: error.response?.status || 500,
        data: error.response?.data || { error: error.message },
        timestamp: new Date().toISOString()
      });

      // Still show partial results if available
      if (error.response?.data?.title) {
        setWebsiteData(error.response.data as WebsitePageResponse);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyWebsiteDataToClipboard = () => {
    if (websiteData) {
      const websiteJson = JSON.stringify(websiteData, null, 2);
      navigator.clipboard.writeText(websiteJson).then(() => {
        alert('Website data copied to clipboard!');
      });
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">🌐 Website Creation API</h2>
      <p>Create website pages using AI-powered content generation based on natural language descriptions</p>

      <div className="info-box">
        ℹ️ This endpoint uses AI to generate structured website content including HTML, CSS, and metadata based on your description.
      </div>

      <div className="form-group">
        <label htmlFor="description">Page Description: *</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe the website page you want to create (e.g., A welcoming home page with service times and contact information)"
          rows={4}
          style={{ width: '100%', resize: 'vertical' }}
          disabled={loading}
        />
      </div>

      <div className="query-examples">
        <label>Sample Descriptions:</label>
        <div className="example-tags">
          {sampleDescriptions.map((sampleDescription, index) => (
            <button
              key={index}
              className="example-tag"
              onClick={() => setDescriptionExample(sampleDescription)}
              style={{ textAlign: 'left' }}
            >
              {sampleDescription}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="churchId">Church ID (Optional):</label>
        <input
          id="churchId"
          type="text"
          value={formData.churchId}
          onChange={(e) => handleInputChange('churchId', e.target.value)}
          placeholder="e.g., my-church-123"
          style={{ width: '100%' }}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Page Title (Optional):</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Welcome to Our Church"
          style={{ width: '100%' }}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="url">Page URL (Optional):</label>
        <input
          id="url"
          type="text"
          value={formData.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          placeholder="e.g., home or about-us"
          style={{ width: '100%' }}
          disabled={loading}
        />
      </div>

      <button
        onClick={handleCreatePage}
        disabled={loading || !formData.description.trim()}
        className="btn btn-primary"
      >
        {loading ? 'Creating Page...' : 'Create Page'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p>Generating your website page content...</p>
        </div>
      )}

      {websiteData && (
        <div style={{ marginTop: '25px' }}>
          <div className="website-preview" style={{
            backgroundColor: '#f0f7ff',
            border: '1px solid #3498db',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#2c3e50', margin: 0 }}>
                🌐 Generated Website Page
              </h3>
              <button
                onClick={copyWebsiteDataToClipboard}
                className="btn btn-secondary"
                style={{ fontSize: '0.9em' }}
              >
                📋 Copy JSON
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#2c3e50' }}>Title:</strong>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#3498db', marginTop: '5px' }}>
                  {websiteData.title}
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#2c3e50' }}>URL:</strong>
                <div style={{
                  fontFamily: 'monospace',
                  backgroundColor: '#f8f9fa',
                  padding: '5px 8px',
                  borderRadius: '3px',
                  display: 'inline-block',
                  marginTop: '5px'
                }}>
                  {websiteData.url}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <strong style={{ color: '#2c3e50' }}>Description:</strong>
                <div style={{ marginTop: '5px', lineHeight: '1.5' }}>
                  {websiteData.description}
                </div>
              </div>

              {websiteData.sections && websiteData.sections.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#2c3e50' }}>Sections ({websiteData.sections.length}):</strong>
                  <div style={{ marginTop: '10px' }}>
                    {websiteData.sections.map((section: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          border: '1px solid #e1e8ed',
                          borderRadius: '6px',
                          padding: '10px',
                          marginBottom: '8px',
                          backgroundColor: '#fff'
                        }}
                      >
                        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                          {section.title || section.name || `Section ${index + 1}`}
                        </div>
                        {section.content && (
                          <div style={{ fontSize: '0.9em', color: '#666' }}>
                            {typeof section.content === 'string'
                              ? section.content.substring(0, 150) + (section.content.length > 150 ? '...' : '')
                              : JSON.stringify(section.content).substring(0, 150) + '...'
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {websiteData.metadata && (
                <div>
                  <strong style={{ color: '#2c3e50' }}>Metadata:</strong>
                  <div style={{
                    marginTop: '5px',
                    fontFamily: 'monospace',
                    fontSize: '0.9em',
                    backgroundColor: '#f8f9fa',
                    padding: '10px',
                    borderRadius: '6px',
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}>
                    <pre>{JSON.stringify(websiteData.metadata, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteCreationTester;