import React, { useEffect, useState } from "react";
import adminResultAPI from "../../api/adminResultAPI";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

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
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '5px solid #e0e0e0',
            borderTop: '5px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <h3 style={{ color: '#7f8c8d', fontSize: '1.3rem' }}>Loading result...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <Container>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          marginBottom: '3rem',
          boxShadow: '0 15px 50px rgba(102, 126, 234, 0.2)',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            📊 Result Details
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: 0 }}>
            Administrative Result Review
          </p>
        </div>

        {/* Result Summary Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: `4px solid ${result.passed ? '#43e97b' : '#ff6b6b'}`
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ color: '#7f8c8d', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Student
              </label>
              <p style={{ color: '#667eea', fontWeight: '700', fontSize: '1.1rem', marginBottom: 0 }}>
                {result.user.firstName} {result.user.lastName}
              </p>
            </div>
            <div>
              <label style={{ color: '#7f8c8d', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Quiz
              </label>
              <p style={{ color: '#764ba2', fontWeight: '700', fontSize: '1.1rem', marginBottom: 0 }}>
                {result.quiz.title}
              </p>
            </div>
            <div>
              <label style={{ color: '#7f8c8d', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Score
              </label>
              <p style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
                fontSize: '1.1rem',
                marginBottom: 0
              }}>
                {result.obtainedMarks}/{result.totalMarks}
              </p>
            </div>
            <div>
              <label style={{ color: '#7f8c8d', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Percentage
              </label>
              <p style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
                fontSize: '1.1rem',
                marginBottom: 0
              }}>
                {result.percentage.toFixed(2)}%
              </p>
            </div>
            <div>
              <label style={{ color: '#7f8c8d', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Status
              </label>
              <p style={{
                color: result.passed ? '#43e97b' : '#ff6b6b',
                fontWeight: '700',
                fontSize: '1.1rem',
                marginBottom: 0
              }}>
                {result.passed ? '✅ PASSED' : '❌ FAILED'}
              </p>
            </div>
            <div>
              <label style={{ color: '#7f8c8d', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                Date
              </label>
              <p style={{ color: '#2c3e50', fontWeight: '600', fontSize: '1rem', marginBottom: 0 }}>
                {new Date(result.attemptedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Answers Table */}
        <div style={{
          overflowX: 'auto',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          padding: '2rem'
        }}>
          <h3 style={{ color: '#2c3e50', fontWeight: '700', marginBottom: '1.5rem' }}>
            ❓ Answer Details
          </h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>#</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700' }}>Question</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Student Answer</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Correct Answer</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '700' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((ans, i) => {
                const isCorrect = ans.marksAwarded > 0;
                return (
                  <tr key={ans.id} style={{
                    borderBottom: '1px solid #ecf0f1',
                    background: i % 2 === 0 ? '#f8f9fa' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0f4ff';
                    e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(102, 126, 234, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? '#f8f9fa' : 'white';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <td style={{ padding: '1rem', fontWeight: '700', color: '#667eea' }}>
                      {i + 1}
                    </td>
                    <td style={{ padding: '1rem', color: '#2c3e50', fontWeight: '600' }}>
                      {ans.question.questionText}
                    </td>
                    <td style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontWeight: '700',
                      color: isCorrect ? '#43e97b' : '#ff6b6b'
                    }}>
                      {ans.userAnswer || '⊘ No answer'}
                    </td>
                    <td style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontWeight: '700',
                      color: '#43e97b'
                    }}>
                      {ans.correctAnswer}
                    </td>
                    <td style={{
                      padding: '1rem',
                      textAlign: 'center',
                      fontWeight: '700',
                      color: isCorrect ? '#43e97b' : '#ff6b6b'
                    }}>
                      {ans.marksAwarded}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}

export default AdminResultDetailPage;
