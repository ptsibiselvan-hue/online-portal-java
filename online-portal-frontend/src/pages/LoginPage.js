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
    <Container className="mt-5">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 className="mb-4 text-center">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </Container>
  );
}

export default LoginPage;
