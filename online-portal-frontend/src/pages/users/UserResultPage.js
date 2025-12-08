import React, { useEffect, useState } from 'react';
import resultAPI from '../../api/resultAPI';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert } from 'react-bootstrap';

function UserResultPage() {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) {
      navigate('/login');
      return;
    }

    const loadResults = async () => {
      try {
        const response = await resultAPI.getUserResults(user.id);
        setResults(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error loading results", error);
        let errorMsg = 'Failed to load results';
        if (error.response?.data?.message) {
          errorMsg = error.response.data.message;
        } else if (error.response?.data) {
          errorMsg = typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data);
        } else if (error.message) {
          errorMsg = error.message;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    loadResults();
  }, [user?.id, navigate]);

  if (loading) return <Container className="mt-5"><h3>Loading results...</h3></Container>;

  return (
    <Container className="mt-5">
      <h2>Your Quiz Results</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {results.length === 0 ? (
        <p>No results available yet.</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Total Marks</th>
              <th>Obtained</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.id}>
                <td>{r.quiz?.id || 'N/A'}</td>
                <td>{r.totalMarks}</td>
                <td>{r.obtainedMarks}</td>
                <td>{r.percentage.toFixed(2)}%</td>
                <td>{r.passed ? "Passed" : "Failed"}</td>
                <td>{new Date(r.attemptedAt).toLocaleString()}</td>
                <td>
                  <Link to={`/results/${r.id}`}>
                    <Button size="sm" variant="primary">View</Button>
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

export default UserResultPage;
