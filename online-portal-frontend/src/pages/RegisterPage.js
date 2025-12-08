import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
    <Container className="mt-5">
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </Container>
  );
}

export default RegisterPage;

