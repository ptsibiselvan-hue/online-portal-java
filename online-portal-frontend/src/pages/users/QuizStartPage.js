import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizAPI from '../../api/quizAPI';
import resultAPI from '../../api/resultAPI';
import { useSelector } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';

function QuizStartPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth);

  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const quiz = await quizAPI.getById(id);
        setQuizTitle(quiz.data.title);

        const qns = await quizAPI.getQuestions(id);
        setQuestions(qns.data);
      } catch (error) {
        console.error("Error loading quiz", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuizData();
  }, [id]);

  if (loading) return <h3 className="mt-5 text-center">Loading quiz...</h3>;
  if (questions.length === 0) return <h3 className="mt-5 text-center">No questions available</h3>;

  const q = questions[current];

  // ⭐ Next
  const handleNext = () => {
    setAnswers({
      ...answers,
      [q.id]: selectedAnswer, // SAVE ANSWER BY QUESTION ID
    });
    setSelectedAnswer("");
    setCurrent(current + 1);
  };

  // ⭐ Previous
  const handlePrevious = () => {
    const prevQ = questions[current - 1];
    setSelectedAnswer(answers[prevQ.id] || "");
    setCurrent(current - 1);
  };

  // ⭐ Submit quiz
  const handleSubmit = async () => {
    // Validate user is logged in
    if (!user || !user.id) {
      alert('Error: User not logged in. Please login and try again.');
      navigate("/login");
      return;
    }

    // Calculate score
    let score = 0;
    questions.forEach((ques) => {
      if (answers[ques.id] === ques.correctAnswer) {
        score += ques.marks;
      }
    });

    const totalMarks = questions.reduce((sum, qn) => sum + qn.marks, 0);
    const percentage = (score / totalMarks) * 100;
    const passed = percentage >= 40;

    const resultData = {
      user: { id: user.id },
      quiz: { id: Number(id) },
      obtainedMarks: score,
      totalMarks: totalMarks,
      percentage: percentage,
      passed: passed,
      answers: answers // SEND ANSWER MAP
    };

    try {
      await resultAPI.submitResult(resultData);
      alert(`Quiz Submitted!\nScore: ${score}/${totalMarks}`);
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = 'Failed to submit quiz. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Quiz: {quizTitle}</h2>

      <Card className="mt-4 p-3">
        <h4>Question {current + 1} of {questions.length}</h4>
        <p>{q.questionText}</p>

        <div>
          {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, i) => (
            <Button
              key={i}
              variant={selectedAnswer === opt ? "primary" : "outline-primary"}
              className="mt-2 w-100"
              onClick={() => setSelectedAnswer(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>

        <div className="mt-3 d-flex justify-content-between">
          <Button disabled={current === 0} onClick={handlePrevious}>
            Previous
          </Button>

          {current < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="success" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>
      </Card>
    </Container>
  );
}

export default QuizStartPage;
