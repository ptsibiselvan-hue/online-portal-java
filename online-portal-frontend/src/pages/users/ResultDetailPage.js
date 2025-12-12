import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import resultAPI from '../../api/resultAPI';
import { Container } from 'react-bootstrap';

function ResultDetailPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await resultAPI.getResultDetail(resultId);
        setResult(res.data.result);
        setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
      } catch (err) {
        console.error("Error loading result detail:", err);
        let errorMsg = 'Failed to load result details';
        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.response?.data) {
          errorMsg = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
        } else if (err.message) {
          errorMsg = err.message;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [resultId]);

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
          <h3 style={{ color: '#7f8c8d', fontSize: '1.3rem' }}>Loading result...</h3>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        padding: '2rem 0'
      }}>
        <Container>
          <div style={{
            background: '#fee',
            border: '2px solid #e74c3c',
            color: '#c0392b',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            <p>{error || 'Result not found'}</p>
            <button
              onClick={() => navigate('/results')}
              style={{
                padding: '0.85rem 1.8rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}>
              ← Back to Results
            </button>
          </div>
        </Container>
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
            📊 Result Details
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Review your quiz performance
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fff3cd',
            border: '2px solid #ff6b6b',
            color: '#856404',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Score Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: `4px solid ${result.passed ? '#43e97b' : '#ff6b6b'}`
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {result.obtainedMarks} / {result.totalMarks}
              </div>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                Score
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                {result.percentage.toFixed(2)}%
              </div>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                Percentage
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: result.passed ? '#43e97b' : '#ff6b6b',
                marginBottom: '0.5rem'
              }}>
                {result.passed ? '✅' : '❌'}
              </div>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600' }}>
                {result.passed ? 'Passed' : 'Failed'}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1rem',
                color: '#7f8c8d',
                marginBottom: '0.5rem'
              }}>
                📅
              </div>
              <p style={{ color: '#7f8c8d', marginBottom: 0, fontWeight: '600', fontSize: '0.9rem' }}>
                {new Date(result.attemptedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Answers Table */}
        {answers.length > 0 ? (
          <div style={{
            overflowX: 'auto',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ color: '#2c3e50', fontWeight: '700', marginBottom: '1.5rem' }}>
              ❓ Answer Review
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>#</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Question</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Your Answer</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Correct Answer</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Marks</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((item, i) => {
                  const isCorrect = item.marksAwarded > 0;
                  return (
                    <tr key={item.id || i} style={{
                      borderBottom: '1px solid #ecf0f1',
                      background: i % 2 === 0 ? '#f8f9fa' : 'white',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f4ff';
                      e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(102, 126, 234, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = i % 2 === 0 ? '#f8f9fa' : 'white';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <td style={{ padding: '1rem', fontWeight: '700', color: '#667eea' }}>
                        {i + 1}
                      </td>
                      <td style={{ padding: '1rem', color: '#2c3e50', fontWeight: '600' }}>
                        {item.question?.questionText || 'N/A'}
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: isCorrect ? '#43e97b' : '#ff6b6b'
                      }}>
                        {item.userAnswer || '⊘ No answer'}
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: '#43e97b'
                      }}>
                        {item.correctAnswer}
                      </td>
                      <td style={{
                        padding: '1rem',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: isCorrect ? '#43e97b' : '#ff6b6b'
                      }}>
                        {item.marksAwarded}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            background: '#e8f5e9',
            border: '2px solid #43a047',
            color: '#2e7d32',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: '500',
            marginBottom: '2rem'
          }}>
            ℹ️ No detailed answer information available for this result.
          </div>
        )}

        {/* Back Button */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/results')}
            style={{
              padding: '0.85rem 1.8rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)';
            }}>
            ← Back to Results
          </button>
        </div>
      </Container>
    </div>
  );
}

export default ResultDetailPage;
