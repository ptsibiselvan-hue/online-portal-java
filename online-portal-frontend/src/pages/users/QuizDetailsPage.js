import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizAPI from '../../api/quizAPI';
import { Container, Button } from 'react-bootstrap';

function QuizDetailsPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await quizAPI.getById(id);
        setQuiz(response.data);
      } catch (err) {
        console.error("Error loading quiz", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return <h3 className="mt-5 text-center">Loading quiz...</h3>;

  if (!quiz) return <h3 className="mt-5 text-center">Quiz not found</h3>;

  return (
    <Container className="mt-5">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      <p><strong>Total Questions:</strong> {quiz.totalQuestions}</p>
      <p><strong>Max Marks:</strong> {quiz.maxMarks}</p>
      <p><strong>Passing Marks:</strong> {quiz.passingMarks}</p>

      <Button
        variant="success"
        href={`/quiz/${quiz.id}/start`}
      >
        Start Quiz
      </Button>
    </Container>
  );
}

export default QuizDetailsPage;
