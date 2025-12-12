import React, { useEffect, useState } from 'react';
import resultAPI from '../../api/resultAPI';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function UserResultPage() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    const loadResults = async () => {
      try {
        const response = await resultAPI.getUserResults(user.id);
        setResults(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error loading results", error);
        let errorMsg = 'Failed to load results';
        if (error.response?.data?.message) {
          errorMsg = error.response.data.message;
        } else if (error.response?.data) {
          errorMsg = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
        } else if (error.message) {
          errorMsg = error.message;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [user?.id, navigate]);

  if (loading) return (
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
        <h3 style={{ color: '#7f8c8d', fontSize: '1.3rem' }}>Loading your results...</h3>
      </div>
    </div>
  );

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
            📈 Your Quiz Results
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Track your performance and progress
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

        {results.length === 0 ? (
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
            ℹ️ No results available yet. Take a quiz to see your results here.
          </div>
        ) : (
          <div style={{
            overflowX: 'auto',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Quiz</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Total Marks</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Obtained</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Percentage</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, index) => {
                  const percentage = r.percentage;
                  const statusColor = r.passed ? '#43e97b' : '#ff6b6b';
                  const statusText = r.passed ? '✅ Passed' : '❌ Failed';
                  return (
                    <tr key={r.id} style={{
                      borderBottom: '1px solid #ecf0f1',
                      background: index % 2 === 0 ? '#f8f9fa' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f4ff';
                      e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(102, 126, 234, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? '#f8f9fa' : 'white';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#2c3e50' }}>
                        📝 Quiz {r.quiz?.id || 'N/A'}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#667eea', fontWeight: '600' }}>
                        {r.totalMarks}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#764ba2', fontWeight: '600' }}>
                        {r.obtainedMarks}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.9rem'
                        }}>
                          {percentage.toFixed(2)}%
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          color: statusColor,
                          fontWeight: '700'
                        }}>
                          {statusText}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', color: '#7f8c8d', fontSize: '0.9rem' }}>
                        {new Date(r.attemptedAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <Link to={`/results/${r.id}`} style={{ textDecoration: 'none' }}>
                          <button style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: 'white',
                            fontWeight: '700',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(67, 233, 123, 0.2)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(67, 233, 123, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(67, 233, 123, 0.2)';
                          }}>
                            👁️ View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default UserResultPage;
