import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
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
    <Container className="mt-5">
      <h2>Manage Quizzes</h2>

      <Link to="/admin/quizzes/add" className="btn btn-success mb-3">
        + Add Quiz
      </Link>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Max Marks</th>
            <th>Passing Marks</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.id}</td>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>{getCategoryName(quiz.category.id)}</td>
              <td>{quiz.maxMarks}</td>
              <td>{quiz.passingMarks}</td>

              <td>
                <Link
                  to={`/admin/quizzes/edit/${quiz.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(quiz.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminQuizListPage;
