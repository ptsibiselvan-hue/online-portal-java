import React, { useEffect, useState } from "react";
import adminResultAPI from "../../api/adminResultAPI";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminResultListPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminResultAPI.getAll();
        setResults(res.data);
      } catch (err) {
        console.error("Error loading results", err);
      }
    };
    load();
  }, []);

  return (
    <Container className="mt-5">
      <h2>All Quiz Results (Admin)</h2>

      {results.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Quiz</th>
              <th>Marks</th>
              <th>Percent</th>
              <th>Status</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{r.user.firstName} {r.user.lastName}</td>
                <td>{r.quiz.title}</td>
                <td>{r.obtainedMarks}/{r.totalMarks}</td>
                <td>{r.percentage.toFixed(2)}%</td>
                <td>{r.passed ? "Pass" : "Fail"}</td>
                <td>{new Date(r.attemptedAt).toLocaleString()}</td>
                <td>
                  <Link to={`/admin/results/${r.id}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminResultListPage;
