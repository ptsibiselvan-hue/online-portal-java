import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import categoryAPI from "../../api/categoryAPI";
import { useToast } from "../../context/ToastContext";

function AdminCategoryListPage() {
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();

  const loadCategories = async () => {
    const res = await categoryAPI.getAll();
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await categoryAPI.delete(id);
      showToast("✓ Category deleted successfully!", "success");
      loadCategories();
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Failed to delete category";
      showToast("✗ " + errMsg, "danger");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Manage Categories</h2>

      <Link to="/admin/categories/add" className="btn btn-success mb-3">
        + Add Category
      </Link>

      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>
                <Link
                  to={`/admin/categories/edit/${cat.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
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

export default AdminCategoryListPage;
