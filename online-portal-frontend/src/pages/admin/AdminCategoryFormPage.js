import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import categoryAPI from "../../api/categoryAPI";
import { useToast } from "../../context/ToastContext";

function AdminCategoryFormPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const res = await categoryAPI.getById(id);
      setCategory(res.data);
      setError(null);
    } catch (err) {
      console.error("Error loading category:", err);
      setError(err?.response?.data?.message || "Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!category.name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (id) {
        await categoryAPI.update(id, category);
        showToast("✓ Category updated successfully!", "success");
      } else {
        await categoryAPI.create(category);
        showToast("✓ Category created successfully!", "success");
      }
      
      setTimeout(() => navigate("/admin/categories"), 1500);
    } catch (err) {
      console.error("Error saving category:", err);
      const errMsg = err?.response?.data?.message || "Failed to save category";
      setError(errMsg);
      showToast("✗ " + errMsg, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>{id ? "Edit Category" : "Add Category"}</h2>
      
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

      {loading && id ? (
        <Spinner animation="border" /> 
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              disabled={loading}
            />
          </Form.Group>

          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Saving..." : "Save Category"}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={() => navigate("/admin/categories")} disabled={loading}>
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default AdminCategoryFormPage;
