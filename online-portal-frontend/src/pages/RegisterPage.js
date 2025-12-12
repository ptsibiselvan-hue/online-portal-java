import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ✅ FIXED IMPORT — this was the main issue
import authAPI from '../api/authAPI';

import * as authConstants from '../constants/authConstants';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [error, setError] = useState('');
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch({ type: authConstants.AUTH_REGISTER_REQUEST });

    try {
      const response = await authAPI.register(formData);

      dispatch({
        type: authConstants.AUTH_REGISTER_SUCCESS,
        payload: { token: 'mock-token', user: response.data.user },
      });

      navigate('/dashboard');

    } catch (err) {
      let errorMessage = 'Registration failed';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data) {
        errorMessage =
          typeof err.response.data === 'string'
            ? err.response.data
            : JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      dispatch({
        type: authConstants.AUTH_REGISTER_FAIL,
        payload: errorMessage,
      });
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '550px', width: '100%' }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>
            📚 Exam Portal
          </div>
          <p style={{ color: '#666', fontSize: '1.1rem', fontWeight: '500' }}>
            Your Gateway to Academic Excellence
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.15)',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          animation: 'slideInUp 0.6s ease-out'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Create Account
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#7f8c8d',
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            Join our community and start your exam journey
          </p>

          {error && (
            <div style={{
              background: '#fee',
              border: '2px solid #e74c3c',
              color: '#c0392b',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
              fontWeight: '500'
            }}>
              ❌ {error}
            </div>
          )}

          <Form onSubmit={handleSubmit}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  marginBottom: '0.6rem',
                  display: 'block'
                }}>
                  👤 First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    background: '#f8f9fa',
                    border: '2px solid #e0e0e0',
                    color: '#2c3e50',
                    borderRadius: '12px',
                    padding: '0.9rem 1rem',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #667eea';
                    e.target.style.background = '#fff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid #e0e0e0';
                    e.target.style.background = '#f8f9fa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  marginBottom: '0.6rem',
                  display: 'block'
                }}>
                  👤 Last Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    background: '#f8f9fa',
                    border: '2px solid #e0e0e0',
                    color: '#2c3e50',
                    borderRadius: '12px',
                    padding: '0.9rem 1rem',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #667eea';
                    e.target.style.background = '#fff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid #e0e0e0';
                    e.target.style.background = '#f8f9fa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-4">
              <Form.Label style={{
                color: '#2c3e50',
                fontWeight: '700',
                fontSize: '0.95rem',
                marginBottom: '0.8rem',
                display: 'block'
              }}>
                👤 Username
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  background: '#f8f9fa',
                  border: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  borderRadius: '12px',
                  padding: '0.9rem 1.2rem',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #667eea';
                  e.target.style.background = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e0e0e0';
                  e.target.style.background = '#f8f9fa';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{
                color: '#2c3e50',
                fontWeight: '700',
                fontSize: '0.95rem',
                marginBottom: '0.8rem',
                display: 'block'
              }}>
                📧 Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="your.email@college.edu"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  background: '#f8f9fa',
                  border: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  borderRadius: '12px',
                  padding: '0.9rem 1.2rem',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #667eea';
                  e.target.style.background = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e0e0e0';
                  e.target.style.background = '#f8f9fa';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{
                color: '#2c3e50',
                fontWeight: '700',
                fontSize: '0.95rem',
                marginBottom: '0.8rem',
                display: 'block'
              }}>
                🔐 Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  background: '#f8f9fa',
                  border: '2px solid #e0e0e0',
                  color: '#2c3e50',
                  borderRadius: '12px',
                  padding: '0.9rem 1.2rem',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.border = '2px solid #667eea';
                  e.target.style.background = '#fff';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '2px solid #e0e0e0';
                  e.target.style.background = '#f8f9fa';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                padding: '0.95rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '700',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }
              }}
            >
              {loading ? '⏳ Creating Account...' : '✨ Create Account'}
            </Button>
          </Form>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          color: '#2c3e50'
        }}>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            Already registered?
          </p>
          <a href="/login" style={{
            color: '#667eea',
            fontWeight: '700',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#764ba2'}
          onMouseLeave={(e) => e.target.style.color = '#667eea'}
          >
            Sign in here →
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

