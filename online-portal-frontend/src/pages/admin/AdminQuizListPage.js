import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import quizAPI from "../../api/quizAPI";
import categoryAPI from "../../api/categoryAPI";

function AdminQuizListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    const q = await quizAPI.getAll();
    const c = await categoryAPI.getAll();

    setQuizzes(q.data);
    setCategories(c.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Unknown";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;
    await quizAPI.delete(id);
    loadData();
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
            ✏️ Manage Quizzes
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Create, edit, and manage all quizzes
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Link to="/admin/quizzes/add" style={{ textDecoration: 'none' }}>
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
              ➕ Add New Quiz
            </button>
          </Link>
        </div>

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
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Title</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Description</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Max Marks</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Passing</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz.id} style={{
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
                    {quiz.id}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: '600', color: '#667eea' }}>
                    {quiz.title}
                  </td>
                  <td style={{ padding: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {quiz.description?.substring(0, 40)}...
                  </td>
                  <td style={{ padding: '1rem', color: '#2c3e50', fontWeight: '600' }}>
                    {getCategoryName(quiz.category.id)}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#764ba2' }}>
                    {quiz.maxMarks}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#43e97b' }}>
                    {quiz.passingMarks}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <Link to={`/admin/quizzes/edit/${quiz.id}`} style={{ textDecoration: 'none' }}>
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
                      onClick={() => handleDelete(quiz.id)}
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
      </Container>
    </div>
  );
}

export default AdminQuizListPage;
