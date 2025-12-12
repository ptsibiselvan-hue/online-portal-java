import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizAPI from '../../api/quizAPI';
import resultAPI from '../../api/resultAPI';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

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
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.2)',
          border: '2px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h2 style={{
            color: '#2c3e50',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            📚 {quizTitle}
          </h2>
          <p style={{ color: '#7f8c8d', marginBottom: 0 }}>
            Question {current + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 5px 20px rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{
            background: '#e0e0e0',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              height: '100%',
              width: `${((current + 1) / questions.length) * 100}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <p style={{ color: '#7f8c8d', marginBottom: 0, fontSize: '0.9rem' }}>
            {Math.round(((current + 1) / questions.length) * 100)}% Complete
          </p>
        </div>

        {/* Question Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.1)',
          border: '3px solid rgba(102, 126, 234, 0.15)',
          borderTop: '5px solid #667eea'
        }}>
          <h4 style={{
            color: '#667eea',
            fontSize: '1.3rem',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}>
            Question {current + 1}
          </h4>
          <p style={{
            color: '#2c3e50',
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {q.questionText}
          </p>

          {/* Options */}
          <div style={{ marginBottom: '2rem' }}>
            {[q.optionA, q.optionB, q.optionC, q.optionD].map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedAnswer(opt)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  marginBottom: '1rem',
                  border: selectedAnswer === opt ? '3px solid #667eea' : '2px solid #e0e0e0',
                  borderRadius: '12px',
                  background: selectedAnswer === opt ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' : '#f8f9fa',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: '#2c3e50',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = selectedAnswer === opt ? e.target.style.background : '#f0f1f5';
                  e.target.style.transform = 'translateX(5px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = selectedAnswer === opt ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' : '#f8f9fa';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid #667eea',
                  marginRight: '1rem',
                  background: selectedAnswer === opt ? '#667eea' : 'transparent',
                  position: 'relative'
                }}>
                  {selectedAnswer === opt && (
                    <span style={{
                      content: '""',
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      background: 'white',
                      borderRadius: '50%',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}></span>
                  )}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between'
          }}>
            <button
              disabled={current === 0}
              onClick={handlePrevious}
              style={{
                padding: '0.9rem 2rem',
                borderRadius: '12px',
                border: 'none',
                background: current === 0 ? '#ccc' : '#95a5a6',
                color: 'white',
                fontWeight: '700',
                cursor: current === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                if (current !== 0) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(149, 165, 166, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ← Previous
            </button>

            {current < questions.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                style={{
                  padding: '0.9rem 2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(67, 233, 123, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(67, 233, 123, 0.3)';
                }}
              >
                ✅ Submit Quiz
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default QuizStartPage;
