import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const API_BASE = "http://localhost:8081/api";

export default function AdminStudentsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/admin/users`);
        const userList = Array.isArray(res.data) ? res.data : res.data?.users || [];
        setUsers(userList);
        
        // Fetch exam history for each student
        userList.forEach(async (u) => {
          if (u.role === "STUDENT") {
            try {
              const detRes = await axios.get(`${API_BASE}/admin/results?userId=${u.id}`);
              setStudentDetails(prev => ({
                ...prev,
                [u.id]: detRes.data || []
              }));
            } catch (e) {
              console.error(`Failed to load details for user ${u.id}:`, e);
            }
          }
        });
      } catch (err) {
        console.error("Error loading users:", err);
        setError(err?.response?.data?.message || err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
        <h3 style={{ color: '#7f8c8d', fontSize: '1.3rem' }}>Loading students...</h3>
      </div>
    </div>
  );

  if (error) return (
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
          padding: '1.5rem',
          borderRadius: '10px',
          fontWeight: '500'
        }}>
          ❌ Error: {error}
        </div>
      </Container>
    </div>
  );

  // Treat any non-admin user as a student (some accounts use role 'USER')
  const studentList = users.filter(u => (u.role || '').toUpperCase() !== 'ADMIN');

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
            👥 Manage Students
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            View student registrations and performance
          </p>
        </div>

        {studentList.length === 0 ? (
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
            ℹ️ No students registered yet.
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
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Username</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Tests</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((u, index) => {
                  const details = studentDetails[u.id] || [];
                  const completed = details.filter(d => d.passed !== undefined).length;
                  const isActive = completed > 0;
                  return (
                    <tr key={u.id} style={{
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
                        {u.id}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: '600', color: '#667eea' }}>
                        {u.firstName} {u.lastName || ''}
                      </td>
                      <td style={{ padding: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
                        {u.email}
                      </td>
                      <td style={{ padding: '1rem', color: '#2c3e50' }}>
                        {u.username}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '700', color: '#764ba2' }}>
                        {completed}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '20px',
                          fontWeight: '700',
                          fontSize: '0.85rem',
                          background: isActive ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : '#e0e0e0',
                          color: isActive ? 'white' : '#7f8c8d'
                        }}>
                          {isActive ? '✅ Active' : '⏸️ Not Started'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <Link to={`/admin/student-details/${u.id}`} style={{ textDecoration: 'none' }}>
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
