import React, { useEffect, useState } from "react";
import adminResultAPI from "../../api/adminResultAPI";
import { useParams } from "react-router-dom";
import { Container, Table, Card } from "react-bootstrap";

function AdminResultDetailPage() {
  const { resultId } = useParams();

  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminResultAPI.getDetail(resultId);
        setResult(res.data.result);
        setAnswers(res.data.answers);
      } catch (err) {
        console.error("Error loading result detail", err);
      }
    };
    load();
  }, [resultId]);

  if (!result) {
    return <Container className="mt-5"><h3>Loading...</h3></Container>;
  }

  return (
    <Container className="mt-5">
      <h2>Result Details (Admin)</h2>

      <Card className="p-3 mt-3">
        <h4>User: {result.user.firstName} {result.user.lastName}</h4>
        <h5>Quiz: {result.quiz.title}</h5>
        <h5>Score: {result.obtainedMarks}/{result.totalMarks}</h5>
        <h5>Percentage: {result.percentage.toFixed(2)}%</h5>
        <h5>Status: {result.passed ? "PASS" : "FAIL"}</h5>
        <h6>Date: {new Date(result.attemptedAt).toLocaleString()}</h6>
      </Card>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>User Answer</th>
            <th>Correct Answer</th>
            <th>Marks Awarded</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((ans, i) => (
            <tr key={ans.id}>
              <td>{i + 1}</td>
              <td>{ans.question.questionText}</td>
              <td>{ans.userAnswer || "No answer"}</td>
              <td>{ans.correctAnswer}</td>
              <td>{ans.marksAwarded}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminResultDetailPage;
