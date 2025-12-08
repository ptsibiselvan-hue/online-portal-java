import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import resultAPI from '../../api/resultAPI';
import { Container, Card, Table, Alert, Button } from 'react-bootstrap';

function ResultDetailPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await resultAPI.getResultDetail(resultId);
        setResult(res.data.result);
        setAnswers(Array.isArray(res.data.answers) ? res.data.answers : []);
      } catch (err) {
        console.error("Error loading result detail:", err);
        let errorMsg = 'Failed to load result details';
        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.response?.data) {
          errorMsg = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
        } else if (err.message) {
          errorMsg = err.message;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [resultId]);

  if (loading) {
    return <Container className="mt-5"><h3>Loading result...</h3></Container>;
  }

  if (!result) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <p>{error || 'Result not found'}</p>
          <Button onClick={() => navigate('/results')} variant="primary">
            Back to Results
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Quiz Result Details</h2>

      {error && <Alert variant="warning">{error}</Alert>}

      <Card className="p-3 mt-3">
        <h4>Score: {result.obtainedMarks} / {result.totalMarks}</h4>
        <h5>Percentage: {result.percentage.toFixed(2)}%</h5>
        <h5>Status: <span style={{color: result.passed ? 'green' : 'red'}}>{result.passed ? "✓ Passed" : "✗ Failed"}</span></h5>
        <h6>Date: {new Date(result.attemptedAt).toLocaleString()}</h6>
      </Card>

      {answers.length > 0 ? (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>Marks Awarded</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((item, i) => (
              <tr key={item.id || i}>
                <td>{i + 1}</td>
                <td>{item.question?.questionText || 'N/A'}</td>
                <td><strong>{item.userAnswer || "No answer"}</strong></td>
                <td><strong style={{color: 'green'}}>{item.correctAnswer}</strong></td>
                <td style={{color: item.marksAwarded > 0 ? 'green' : 'red'}}>
                  <strong>{item.marksAwarded}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info" className="mt-4">No detailed answer information available for this result.</Alert>
      )}

      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate('/results')}>Back to Results</Button>
      </div>
    </Container>
  );
}

export default ResultDetailPage;
