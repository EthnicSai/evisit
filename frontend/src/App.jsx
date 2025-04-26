import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CardCreatePage from './pages/CardCreatePage';  // Added CardCreatePage
import CardManager from './pages/CardManager';
import AdminUserManager from './pages/AdminUserManager';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Card Routes - Create, Manage, View */}
        <Route path="/cards/create/:userId" element={
          <ProtectedRoute>
            <CardCreatePage />
          </ProtectedRoute>
        } />

        {/* Card Management */}
        <Route path="/cardManager/:userId" element={
          <ProtectedRoute>
            <CardManager />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/users" element={<AdminUserManager />} />
      </Routes>
    </Router>
  );
};

export default App;
