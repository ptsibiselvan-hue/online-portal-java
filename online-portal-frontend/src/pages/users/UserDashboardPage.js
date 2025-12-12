import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import quizAPI from '../../api/quizAPI';

function UserDashboardPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await quizAPI.getAll();
        const quizList = Array.isArray(response.data) ? response.data : response.data?.data || [];
        setQuizzes(quizList);
        setError(null);
      } catch (err) {
        console.error("Error loading quizzes:", err);
        setError(err?.response?.data?.message || "Failed to load quizzes");
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

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
            📚 Available Quizzes
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Select a quiz and test your knowledge
          </p>
        </div>

        {/* Button */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/results')}
            style={{
              padding: '0.9rem 1.8rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem',
              boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(67, 233, 123, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(67, 233, 123, 0.3)';
            }}
          >
            📈 View My Results
          </button>
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

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '4px solid #e0e0e0',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div style={{
            background: '#e8f5e9',
            border: '2px solid #43a047',
            color: '#2e7d32',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            ℹ️ No quizzes available at the moment.
          </div>
        ) : (
          <Row>
            {quizzes.map((quiz) => (
              <Col md={4} key={quiz.id} className="mb-4">
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.4s ease',
                  border: '2px solid rgba(102, 126, 234, 0.1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(102, 126, 234, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.1)';
                }}>
                  {/* Color Header */}
                  <div style={{
                    height: '5px',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                  }}></div>

                  {/* Content */}
                  <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h5 style={{
                      color: '#2c3e50',
                      fontWeight: '700',
                      marginBottom: '0.8rem',
                      fontSize: '1.1rem'
                    }}>
                      {quiz.title}
                    </h5>
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '0.9rem',
                      marginBottom: '1.5rem',
                      flex: 1
                    }}>
                      {quiz.description || 'No description available'}
                    </p>

                    {/* Stats */}
                    <div style={{
                      background: '#f8f9fa',
                      borderRadius: '10px',
                      padding: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ marginBottom: '0.8rem' }}>
                        <small style={{ color: '#7f8c8d', display: 'block' }}>
                          📊 Max Marks: <strong style={{ color: '#667eea' }}>{quiz.maxMarks || 0}</strong>
                        </small>
                      </div>
                      <div style={{ marginBottom: '0.8rem' }}>
                        <small style={{ color: '#7f8c8d', display: 'block' }}>
                          ✅ Passing: <strong style={{ color: '#43e97b' }}>{quiz.passingMarks || 0}</strong>
                        </small>
                      </div>
                      <div>
                        <small style={{ color: '#7f8c8d', display: 'block' }}>
                          ❓ Questions: <strong style={{ color: '#764ba2' }}>{quiz.totalQuestions || 0}</strong>
                        </small>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
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
                      }}
                    >
                      ▶️ Start Quiz
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserDashboardPage;
