import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
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
    <Container className="mt-5">
      <h2 className="mb-4">📚 Available Quizzes</h2>

      <Button
        variant="success"
        className="mb-4"
        onClick={() => navigate('/results')}
      >
        📈 View My Results
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" /> Loading quizzes...
        </div>
      ) : quizzes.length === 0 ? (
        <Alert variant="info">No quizzes available at the moment.</Alert>
      ) : (
        <Row>
          {quizzes.map((quiz) => (
            <Col md={4} key={quiz.id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{quiz.title}</Card.Title>
                  <Card.Text>{quiz.description || 'No description'}</Card.Text>

                  <div className="mb-3">
                    <small className="d-block">📊 Max Marks: <strong>{quiz.maxMarks || 0}</strong></small>
                    <small className="d-block">✅ Passing Marks: <strong>{quiz.passingMarks || 0}</strong></small>
                    <small className="d-block">❓ Questions: <strong>{quiz.totalQuestions || 0}</strong></small>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="w-100"
                  >
                    ▶️ Start Quiz
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default UserDashboardPage;
