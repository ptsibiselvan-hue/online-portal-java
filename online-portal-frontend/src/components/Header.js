import React, { useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as authConstants from '../constants/authConstants';

function Header() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auto-logout when window closes
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch({ type: authConstants.AUTH_LOGOUT });
    navigate('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span style={{ color: '#fff' }}>📋 Online Portal</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: '#fff' }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: '#fff' }}>
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                {/* ADMIN NAVIGATION */}
                {user?.role === "ADMIN" && (
                  <>
                    <Nav.Link as={Link} to="/admin" style={{ color: '#fff', fontWeight: 'bold' }}>
                      📊 Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/categories" style={{ color: '#fff' }}>
                      📂 Categories
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/quizzes" style={{ color: '#fff' }}>
                      ✏️ Quizzes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/students" style={{ color: '#fff' }}>
                      👥 Students
                    </Nav.Link>
                  </>
                )}

                {/* STUDENT NAVIGATION */}
                {((user?.role || '').toUpperCase() !== 'ADMIN') && (
                  <>
                    <Nav.Link as={Link} to="/dashboard" style={{ color: '#fff', fontWeight: 'bold' }}>
                      📚 Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/results" style={{ color: '#fff' }}>
                      📈 My Results
                    </Nav.Link>
                  </>
                )}

                <span style={{ color: '#fff', marginRight: '15px', marginLeft: '15px' }}>
                  👤 {user?.firstName} ({user?.role})
                </span>

                <Nav.Link onClick={handleLogout} style={{ color: '#fff', cursor: 'pointer' }}>
                  🚪 Logout
                </Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
