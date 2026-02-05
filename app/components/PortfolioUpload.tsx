'use client';
import { useState } from 'react';
import { Upload, Image, FileText, Link as LinkIcon } from 'lucide-react';
import '../styles/components.css';

interface PortfolioUploadProps {
  skillName: string;
  onGetFeedback: (upload: any) => void;
}

export default function PortfolioUpload({ skillName, onGetFeedback }: PortfolioUploadProps) {
  const [file, setFile] = useState<any>(null);
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({ 
          name: selectedFile.name, 
          size: selectedFile.size,
          preview: reader.result 
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (uploadType === 'file' && file) {
      onGetFeedback({ type: 'file', data: file, skillName });
    } else if (uploadType === 'url' && url) {
      onGetFeedback({ type: 'url', data: url, skillName });
    }
  };

  return (
    <div className="full-height">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card">
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px', color: '#1f2937' }}>
            Upload Your Project
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            For: <span style={{ fontWeight: '600', color: '#667eea' }}>{skillName}</span>
          </p>

          {/* Upload Type Selector */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setUploadType('file')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                background: uploadType === 'file' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                color: uploadType === 'file' ? 'white' : '#6b7280',
                transition: 'all 0.3s'
              }}
            >
              <FileText size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Upload File
            </button>
            <button
              onClick={() => setUploadType('url')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                background: uploadType === 'url' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                color: uploadType === 'url' ? 'white' : '#6b7280',
                transition: 'all 0.3s'
              }}
            >
              <LinkIcon size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Share Link
            </button>
          </div>

          {/* File Upload */}
          {uploadType === 'file' && (
            <div>
              <label className="upload-zone">
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <Upload size={64} color="#9ca3af" style={{ margin: '0 auto 16px' }} />
                <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>
                  Drop your file here or click to browse
                </p>
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '8px' }}>
                  Accepts: Images, PDFs
                </p>
              </label>

              {file && (
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  background: '#d1fae5', 
                  borderRadius: '12px',
                  border: '2px solid #6ee7b7'
                }}>
                  <div className="flex gap-2" style={{ alignItems: 'center' }}>
                    <Image size={32} color="#059669" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600', color: '#065f46' }}>{file.name}</p>
                      <p style={{ fontSize: '0.875rem', color: '#047857' }}>
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* URL Input */}
          {uploadType === 'url' && (
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/yourproject or https://your-demo.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              {url && (
                <p style={{ marginTop: '8px', fontSize: '0.875rem', color: '#10b981' }}>
                  ✓ Valid URL
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!file && !url}
            className="btn-primary"
            style={{ 
              width: '100%', 
              marginTop: '24px',
              opacity: (!file && !url) ? 0.5 : 1,
              cursor: (!file && !url) ? 'not-allowed' : 'pointer'
            }}
          >
            🤖 Get AI Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
