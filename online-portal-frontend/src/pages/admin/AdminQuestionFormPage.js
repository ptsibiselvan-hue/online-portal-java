import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import questionAPI from "../../api/questionAPI";
import { useToast } from "../../context/ToastContext";

function AdminQuestionFormPage() {
  const { questionId, quizId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(!!questionId);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [question, setQuestion] = useState({
    id: "",
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    marks: "",
    quiz: { id: quizId || "" },
  });

  // ✅ LOAD QUESTION FOR EDIT
  const loadQuestion = async () => {
    try {
      setLoading(true);
      const res = await questionAPI.getById(questionId);
      setQuestion(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to load question:", err);
      setError(err?.response?.data?.message || "Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questionId) {
      loadQuestion();
    }
  }, [questionId]);

  // ✅ CREATE/UPDATE QUESTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.questionText.trim()) {
      setError("Question text is required");
      return;
    }

    if (!question.quiz?.id && !quizId) {
      setError("Quiz information is missing");
      return;
    }

    const data = {
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
      marks: Number(question.marks),
      quiz: {
        id: question.quiz?.id || quizId,
      },
    };

    try {
      setLoading(true);
      setError(null);

      if (questionId) {
        await questionAPI.update(questionId, data);
        showToast("✓ Question updated successfully!", "success");
      } else {
        await questionAPI.create(data);
        showToast("✓ Question created successfully!", "success");
      }

      setTimeout(() => navigate(`/admin/questions/${question.quiz?.id || quizId}`), 1500);
    } catch (err) {
      console.error("Error saving question:", err);
      const errMsg = err?.response?.data?.message || "Failed to save question";
      setError(errMsg);
      showToast("✗ " + errMsg, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>{questionId ? "Edit Question" : "Add Question"}</h2>

      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

      {loading && questionId ? (
        <Spinner animation="border" /> 
      ) : (
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Question Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={question.questionText}
              onChange={(e) =>
                setQuestion({ ...question, questionText: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Option A</Form.Label>
            <Form.Control
              value={question.optionA}
              onChange={(e) =>
                setQuestion({ ...question, optionA: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Option B</Form.Label>
            <Form.Control
              value={question.optionB}
              onChange={(e) =>
                setQuestion({ ...question, optionB: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Option C</Form.Label>
            <Form.Control
              value={question.optionC}
              onChange={(e) =>
                setQuestion({ ...question, optionC: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Option D</Form.Label>
            <Form.Control
              value={question.optionD}
              onChange={(e) =>
                setQuestion({ ...question, optionD: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Select
              value={question.correctAnswer}
              onChange={(e) =>
                setQuestion({ ...question, correctAnswer: e.target.value })
              }
              required
              disabled={loading}
            >
              <option value="">Select Correct Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marks</Form.Label>
            <Form.Control
              type="number"
              value={question.marks}
              onChange={(e) =>
                setQuestion({ ...question, marks: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Saving..." : questionId ? "Update Question" : "Add Question"}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate(`/admin/questions/${question.quiz?.id || quizId}`)} disabled={loading}>
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default AdminQuestionFormPage;
