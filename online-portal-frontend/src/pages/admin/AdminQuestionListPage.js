import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
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
    <Container className="mt-5">
      <h2>Manage Questions</h2>

      <Form.Select
        className="mt-3 mb-3"
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value)}
      >
        <option value="">Select Quiz</option>
        {quizzes.map((q) => (
          <option key={q.id} value={q.id}>
            {q.title}
          </option>
        ))}
      </Form.Select>

      {selectedQuiz && (
        <Link
          to={`/admin/questions/add/${selectedQuiz}`}
          className="btn btn-success mb-3"
        >
          + Add Question
        </Link>
      )}

      {selectedQuiz ? (
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.questionText}</td>
                <td>{q.correctAnswer}</td>
                <td>{q.marks}</td>
                <td>
                  <Link
                    to={`/admin/questions/edit/${q.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(q.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Select a quiz to view questions</p>
      )}
    </Container>
  );
}

export default AdminQuestionListPage;
