import React, { useEffect, useState } from "react";
import adminResultAPI from "../../api/adminResultAPI";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminResultListPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminResultAPI.getAll();
        setResults(res.data);
      } catch (err) {
        console.error("Error loading results", err);
      }
    };
    load();
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
            📊 All Quiz Results
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Monitor student performance across all quizzes
          </p>
        </div>

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
            ℹ️ No quiz results available yet.
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
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Student</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Quiz</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Marks</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Percentage</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, index) => (
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
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#667eea' }}>
                      {r.user.firstName} {r.user.lastName}
                    </td>
                    <td style={{ padding: '1rem', color: '#2c3e50', fontWeight: '600' }}>
                      {r.quiz.title}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#764ba2' }}>
                      {r.obtainedMarks}/{r.totalMarks}
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
                        {r.percentage.toFixed(2)}%
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        background: r.passed ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : '#ff6b6b',
                        color: 'white'
                      }}>
                        {r.passed ? '✅ Pass' : '❌ Fail'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#7f8c8d', fontSize: '0.9rem' }}>
                      {new Date(r.attemptedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <Link to={`/admin/results/${r.id}`} style={{ textDecoration: 'none' }}>
                        <button style={{
                          padding: '0.6rem 1.2rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                          color: 'white',
                          fontWeight: '700',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(52, 152, 219, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.2)';
                        }}>
                          👁️ View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AdminResultListPage;
