import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import quizAPI from "../../api/quizAPI";
import categoryAPI from "../../api/categoryAPI";
import { useToast } from "../../context/ToastContext";

function AdminQuizFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [categories, setCategories] = useState([]);
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    maxMarks: "",
    passingMarks: "",
    category: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load categories
  const loadCategories = async () => {
    try {
      const res = await categoryAPI.getAll();
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  // Load quiz when editing
  const loadQuiz = async () => {
    try {
      setLoading(true);
      const res = await quizAPI.getById(id);
      setQuiz({
        title: res.data.title,
        description: res.data.description,
        maxMarks: res.data.maxMarks,
        passingMarks: res.data.passingMarks,
        category: res.data.category?.id
      });
    } catch (err) {
      console.error("Error loading quiz:", err);
      setError(err?.response?.data?.message || "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    if (id) loadQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quiz.title.trim()) {
      setError("Quiz title is required");
      return;
    }

    const quizData = {
      title: quiz.title,
      description: quiz.description,
      maxMarks: quiz.maxMarks,
      passingMarks: quiz.passingMarks,
      category: { id: quiz.category }
    };

    try {
      setLoading(true);
      setError(null);

      if (id) {
        await quizAPI.update(id, quizData);
        showToast("✓ Quiz updated successfully!", "success");
      } else {
        await quizAPI.create(quizData);
        showToast("✓ Quiz created successfully!", "success");
      }

      setTimeout(() => navigate("/admin/quizzes"), 1500);
    } catch (err) {
      console.error("Error saving quiz:", err);
      const errMsg = err?.response?.data?.message || "Failed to save quiz";
      setError(errMsg);
      showToast("✗ " + errMsg, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>{id ? "Edit Quiz" : "Add Quiz"}</h2>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      {loading && id ? (
        <Spinner animation="border" /> 
      ) : (
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Quiz Title</Form.Label>
            <Form.Control
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Marks</Form.Label>
            <Form.Control
              type="number"
              value={quiz.maxMarks}
              onChange={(e) => setQuiz({ ...quiz, maxMarks: e.target.value })}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Passing Marks</Form.Label>
            <Form.Control
              type="number"
              value={quiz.passingMarks}
              onChange={(e) => setQuiz({ ...quiz, passingMarks: e.target.value })}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={quiz.category}
              onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
              required
              disabled={loading}
            >
              <option value="">Select a category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Saving..." : "Save Quiz"}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate("/admin/quizzes")} disabled={loading}>
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default AdminQuizFormPage;
