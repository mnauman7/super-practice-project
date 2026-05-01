import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ManageUsers from './components/ManageUsers' // 1. Import the new component
import { useAuth, AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

// We use a sub-component so we can access the 'useNavigate' hook correctly
function AppContent() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* 2. Add the Protected Route for Home */}
      <Route 
        path="/home" 
        element={<ProtectedRoute><Home onLogout={handleLogout} /></ProtectedRoute>} 
      />

      {/* 3. Add the Protected Route for Manage Users */}
      <Route 
        path="/manage-users" 
        element={<ProtectedRoute><ManageUsers onLogout={handleLogout} /></ProtectedRoute>} 
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default App