import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Student Pages
import UserDashboardPage from "./pages/users/UserDashboardPage";
import QuizStartPage from "./pages/users/QuizStartPage";
import UserResultPage from "./pages/users/UserResultPage";
import ResultDetailPage from "./pages/users/ResultDetailPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminCategoryListPage from "./pages/admin/AdminCategoryListPage";
import AdminCategoryFormPage from "./pages/admin/AdminCategoryFormPage";
import AdminQuizListPage from "./pages/admin/AdminQuizListPage";
import AdminQuizFormPage from "./pages/admin/AdminQuizFormPage";
import AdminQuestionListPage from "./pages/admin/AdminQuestionListPage";
import AdminQuestionFormPage from "./pages/admin/AdminQuestionFormPage";
import AdminResultListPage from "./pages/admin/AdminResultListPage";
import AdminResultDetailPage from "./pages/admin/AdminResultDetailPage";
import AdminStudentsPage from "./pages/admin/AdminStudentsPage";

// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const userRole = (user?.role || '').toUpperCase();
    const required = requiredRole.toUpperCase();
    // Accept legacy 'USER' role as STUDENT
    const allowed = (required === 'STUDENT') ? (userRole === 'STUDENT' || userRole === 'USER') : (userRole === required);
    if (!allowed) {
      return <Navigate to={userRole === 'ADMIN' ? "/admin" : "/login"} replace />;
    }
  }

  return children;
}

function App() {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <Router>
      <Header />
      <main className="app-container">
        <Routes>

          {/* ✅ DEFAULT ROUTE */}
          <Route path="/" element={<Navigate to={isAuthenticated ? (user?.role === "ADMIN" ? "/admin" : "/dashboard") : "/login"} replace />} />

          {/* ============ AUTH ROUTES ============ */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ============ STUDENT ROUTES ============ */}
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="STUDENT"><UserDashboardPage /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute requiredRole="STUDENT"><QuizStartPage /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute requiredRole="STUDENT"><UserResultPage /></ProtectedRoute>} />
          <Route path="/results/:resultId" element={<ProtectedRoute requiredRole="STUDENT"><ResultDetailPage /></ProtectedRoute>} />

          {/* ============ ADMIN ROUTES ============ */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboardPage /></ProtectedRoute>} />

          {/* Categories */}
          <Route path="/admin/categories" element={<ProtectedRoute requiredRole="ADMIN"><AdminCategoryListPage /></ProtectedRoute>} />
          <Route path="/admin/categories/add" element={<ProtectedRoute requiredRole="ADMIN"><AdminCategoryFormPage /></ProtectedRoute>} />
          <Route path="/admin/categories/edit/:categoryId" element={<ProtectedRoute requiredRole="ADMIN"><AdminCategoryFormPage /></ProtectedRoute>} />

          {/* Quizzes */}
          <Route path="/admin/quizzes" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuizListPage /></ProtectedRoute>} />
          <Route path="/admin/quizzes/add" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuizFormPage /></ProtectedRoute>} />
          <Route path="/admin/quizzes/edit/:quizId" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuizFormPage /></ProtectedRoute>} />

          {/* Questions */}
          <Route path="/admin/questions" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuestionListPage /></ProtectedRoute>} />
          <Route path="/admin/questions/:quizId" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuestionListPage /></ProtectedRoute>} />
          <Route path="/admin/questions/add/:quizId" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuestionFormPage /></ProtectedRoute>} />
          <Route path="/admin/questions/edit/:questionId" element={<ProtectedRoute requiredRole="ADMIN"><AdminQuestionFormPage /></ProtectedRoute>} />

          {/* Results */}
          <Route path="/admin/results" element={<ProtectedRoute requiredRole="ADMIN"><AdminResultListPage /></ProtectedRoute>} />
          <Route path="/admin/results/:resultId" element={<ProtectedRoute requiredRole="ADMIN"><AdminResultDetailPage /></ProtectedRoute>} />

          {/* Students */}
          <Route path="/admin/students" element={<ProtectedRoute requiredRole="ADMIN"><AdminStudentsPage /></ProtectedRoute>} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
