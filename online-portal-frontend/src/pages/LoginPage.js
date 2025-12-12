import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import authAPI from '../api/authAPI';
import * as authConstants from '../constants/authConstants';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch({ type: authConstants.AUTH_LOGIN_REQUEST });

    try {
      const response = await authAPI.login({ username, password });

      dispatch({
        type: authConstants.AUTH_LOGIN_SUCCESS,
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      });

      // Redirect based on role
      const role = (response.data.user?.role || '').toUpperCase();
      if (role === 'ADMIN') navigate('/admin');
      else navigate('/dashboard');

    } catch (err) {
      let errorMessage = 'Login failed';

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
        type: authConstants.AUTH_LOGIN_FAIL,
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
      <div style={{ maxWidth: '500px', width: '100%' }}>
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
            Welcome Back
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#7f8c8d',
            marginBottom: '2rem',
            fontSize: '0.95rem'
          }}>
            Sign in to access your exams and results
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
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? '⏳ Verifying...' : '🔓 Login'}
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
            New to the platform?
          </p>
          <a href="/register" style={{
            color: '#667eea',
            fontWeight: '700',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#764ba2'}
          onMouseLeave={(e) => e.target.style.color = '#667eea'}
          >
            Create an Account →
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
