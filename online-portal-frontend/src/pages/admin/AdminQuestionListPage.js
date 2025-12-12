import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import questionAPI from "../../api/questionAPI";
import quizAPI from "../../api/quizAPI";

function AdminQuestionListPage() {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  const loadQuizzes = async () => {
    const res = await quizAPI.getAll();
    setQuizzes(res.data);
  };

  const loadQuestions = async () => {
    if (!selectedQuiz) return;
    const res = await questionAPI.getByQuiz(selectedQuiz);
    setQuestions(res.data);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuiz) loadQuestions();
  }, [selectedQuiz]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await questionAPI.delete(id);
    loadQuestions();
  };

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
            ❓ Manage Questions
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Create, edit, and manage quiz questions
          </p>
        </div>

        {/* Quiz Selector */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.8rem',
            fontWeight: '700',
            color: '#2c3e50'
          }}>
            Select Quiz:
          </label>
          <select
            value={selectedQuiz}
            onChange={(e) => setSelectedQuiz(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              border: '2px solid #667eea',
              fontSize: '1rem',
              color: '#2c3e50',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#764ba2';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Select Quiz...</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title}
              </option>
            ))}
          </select>
        </div>

        {selectedQuiz && (
          <div style={{ marginBottom: '2rem' }}>
            <Link to={`/admin/questions/add/${selectedQuiz}`} style={{ textDecoration: 'none' }}>
              <button style={{
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
              }}>
                ➕ Add New Question
              </button>
            </Link>
          </div>
        )}

        {selectedQuiz ? (
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
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Question</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Answer</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Marks</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={q.id} style={{
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
                      {q.id}
                    </td>
                    <td style={{ padding: '1rem', color: '#667eea', fontWeight: '600' }}>
                      {q.questionText?.substring(0, 50)}...
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#2c3e50', fontWeight: '600' }}>
                      {q.correctAnswer}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#764ba2' }}>
                      {q.marks}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <Link to={`/admin/questions/edit/${q.id}`} style={{ textDecoration: 'none' }}>
                        <button style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#3498db',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          marginRight: '0.5rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.background = '#2980b9';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.background = '#3498db';
                        }}>
                          ✏️ Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(q.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#e74c3c',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.background = '#c0392b';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.background = '#e74c3c';
                        }}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
            fontWeight: '500'
          }}>
            ℹ️ Select a quiz from the dropdown to view and manage its questions.
          </div>
        )}
      </Container>
    </div>
  );
}

export default AdminQuestionListPage;
