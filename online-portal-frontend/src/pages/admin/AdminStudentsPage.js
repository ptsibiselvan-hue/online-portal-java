import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Badge, Spinner, Alert } from "react-bootstrap";

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

  if (loading) return <Container className="mt-5"><Spinner animation="border" /> Loading students...</Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">Error: {error}</Alert></Container>;

  // Treat any non-admin user as a student (some accounts use role 'USER')
  const studentList = users.filter(u => (u.role || '').toUpperCase() !== 'ADMIN');

  return (
    <Container className="mt-5">
      <h2>📚 Manage Students</h2>
      {studentList.length === 0 ? (
        <Alert variant="info">No students registered yet.</Alert>
      ) : (
        <Table bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Tests Completed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map(u => {
              const details = studentDetails[u.id] || [];
              const completed = details.filter(d => d.passed !== undefined).length;
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td><strong>{u.firstName} {u.lastName || ''}</strong></td>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{completed}</td>
                  <td>
                    {completed > 0 ? (
                      <Badge bg="success">Active</Badge>
                    ) : (
                      <Badge bg="secondary">Not Started</Badge>
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/student-details/${u.id}`} className="btn btn-sm btn-primary">
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
