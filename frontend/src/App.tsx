import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Diseases } from './pages/Diseases';
import { Predict } from './pages/Predict';
import { Auth } from './pages/Auth';
import PredictionHistory from './pages/PredictionHistory';  // Correct for default export

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = !!localStorage.getItem('username');
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/diseases" element={<Diseases />} />
          
          {/* Protected Routes */}
          <Route
            path="/predict"
            element={
              <PrivateRoute>
                <Predict />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/prediction-history"
            element={
              <PrivateRoute>
                <PredictionHistory />
              </PrivateRoute>
            }
          />

          <Route path="/signin" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
