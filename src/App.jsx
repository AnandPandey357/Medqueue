import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Doctor from './components/Doctor.jsx';
import Patient from './components/Patient.jsx';
import Hospital from './components/Hospital.jsx';
import EnhancedDashboard from './components/EnhancedDashboard.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <EnhancedDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/doctor" 
          element={
            <PrivateRoute>
              <Doctor />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/patient" 
          element={
            <PrivateRoute>
              <Patient />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/hospital" 
          element={
            <PrivateRoute>
              <Hospital />
            </PrivateRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
