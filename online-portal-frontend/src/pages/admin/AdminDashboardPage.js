import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8081/api";

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalQuizzes: 0,
    totalQuestions: 0,
    totalStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [catRes, quizRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE}/categories`),
          axios.get(`${API_BASE}/quizzes`),
          axios.get(`${API_BASE}/admin/users`),
        ]);

        const categories = Array.isArray(catRes.data) ? catRes.data : catRes.data?.data || [];
        const quizzes = Array.isArray(quizRes.data) ? quizRes.data : quizRes.data?.data || [];
        const users = Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.users || [];
        const students = users.filter(u => u.role === "STUDENT").length;

        // Count total questions across all quizzes
        let totalQuestions = 0;
        for (const quiz of quizzes) {
          totalQuestions += (quiz.totalQuestions || 0);
        }

        setStats({
          totalCategories: categories.length,
          totalQuizzes: quizzes.length,
          totalQuestions: totalQuestions,
          totalStudents: students,
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '5px solid #e0e0e0',
            borderTop: '5px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <h3 style={{ color: '#7f8c8d', fontSize: '1.3rem' }}>Loading dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          marginBottom: '3rem',
          boxShadow: '0 15px 50px rgba(102, 126, 234, 0.2)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            📊 Admin Dashboard
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Monitor and manage your exam portal
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            border: '2px solid #e74c3c',
            color: '#c0392b',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            ❌ {error}
          </div>
        )}

        {/* STATISTICS */}
        <Row className="mb-5">
          <Col md={3} className="mb-3">
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderTop: '4px solid #667eea'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📂</div>
              <h3 style={{
                color: '#667eea',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontSize: '2rem'
              }}>
                {stats.totalCategories}
              </h3>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                Categories
              </p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderTop: '4px solid #764ba2'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✏️</div>
              <h3 style={{
                color: '#764ba2',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontSize: '2rem'
              }}>
                {stats.totalQuizzes}
              </h3>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                Quizzes
              </p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderTop: '4px solid #f59e0b'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❓</div>
              <h3 style={{
                color: '#f59e0b',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontSize: '2rem'
              }}>
                {stats.totalQuestions}
              </h3>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                Questions
              </p>
            </div>
          </Col>
          <Col md={3} className="mb-3">
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
              border: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              borderTop: '4px solid #43e97b'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
              <h3 style={{
                color: '#43e97b',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontSize: '2rem'
              }}>
                {stats.totalStudents}
              </h3>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                Students
              </p>
            </div>
          </Col>
        </Row>

        {/* MANAGEMENT CARDS */}
        <h2 style={{
          color: '#2c3e50',
          fontWeight: '700',
          marginBottom: '2rem',
          fontSize: '1.8rem'
        }}>
          📋 Management Sections
        </h2>
        <Row>
          <Col md={6} className="mb-4">
            <Link to="/admin/categories" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.1)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📂</div>
                <h5 style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  marginBottom: '0.8rem',
                  fontSize: '1.3rem'
                }}>
                  Manage Categories
                </h5>
                <p style={{
                  color: '#7f8c8d',
                  marginBottom: '1.5rem'
                }}>
                  Add, edit or delete quiz categories.
                </p>
                <button style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                }}>
                  Go to Categories →
                </button>
              </div>
            </Link>
          </Col>

          <Col md={6} className="mb-4">
            <Link to="/admin/quizzes" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.1)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✏️</div>
                <h5 style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  marginBottom: '0.8rem',
                  fontSize: '1.3rem'
                }}>
                  Manage Quizzes
                </h5>
                <p style={{
                  color: '#7f8c8d',
                  marginBottom: '1.5rem'
                }}>
                  Create new quizzes and update quiz settings.
                </p>
                <button style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                }}>
                  Go to Quizzes →
                </button>
              </div>
            </Link>
          </Col>

          <Col md={6} className="mb-4">
            <Link to="/admin/questions" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.1)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❓</div>
                <h5 style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  marginBottom: '0.8rem',
                  fontSize: '1.3rem'
                }}>
                  Manage Questions
                </h5>
                <p style={{
                  color: '#7f8c8d',
                  marginBottom: '1.5rem'
                }}>
                  View and add questions inside quizzes.
                </p>
                <button style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                }}>
                  Go to Questions →
                </button>
              </div>
            </Link>
          </Col>

          <Col md={6} className="mb-4">
            <Link to="/admin/students" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.1)';
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <h5 style={{
                  color: '#2c3e50',
                  fontWeight: '700',
                  marginBottom: '0.8rem',
                  fontSize: '1.3rem'
                }}>
                  Manage Students
                </h5>
                <p style={{
                  color: '#7f8c8d',
                  marginBottom: '1.5rem'
                }}>
                  View all registered students and their performance.
                </p>
                <button style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
                }}>
                  Go to Students →
                </button>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboardPage;
