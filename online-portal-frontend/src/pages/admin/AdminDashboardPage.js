import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
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
      <Container className="mt-5 text-center">
        <Spinner animation="border" /> Loading dashboard...
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">📊 Admin Dashboard</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* STATISTICS */}
      <Row className="mb-5">
        <Col md={3} className="mb-3">
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <h4>{stats.totalCategories}</h4>
              <p className="mb-0">Categories</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <h4>{stats.totalQuizzes}</h4>
              <p className="mb-0">Quizzes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center bg-warning text-dark">
            <Card.Body>
              <h4>{stats.totalQuestions}</h4>
              <p className="mb-0">Questions</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <h4>{stats.totalStudents}</h4>
              <p className="mb-0">Students Registered</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* MANAGEMENT CARDS */}
      <h3 className="mb-4">Management Sections</h3>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>📂 Manage Categories</Card.Title>
              <Card.Text>Add, edit or delete quiz categories.</Card.Text>
              <Link to="/admin/categories" className="btn btn-primary">
                Go to Categories
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>✏️ Manage Quizzes</Card.Title>
              <Card.Text>Create new quizzes and update quiz settings.</Card.Text>
              <Link to="/admin/quizzes" className="btn btn-primary">
                Go to Quizzes
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>❓ Manage Questions</Card.Title>
              <Card.Text>View and add questions inside quizzes.</Card.Text>
              <Link to="/admin/questions" className="btn btn-primary">
                Go to Questions
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>👥 Manage Students</Card.Title>
              <Card.Text>View all registered students and their performance.</Card.Text>
              <Link to="/admin/students" className="btn btn-primary">
                Go to Students
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboardPage;
