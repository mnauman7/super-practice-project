import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import UserTable from './components/UserTable'
import NavigationBar from './components/NavigationBar'
import { useAuth, AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><UserTable /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

// 2. Updated Helper Function
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  // If not logged in, go to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If logged in, show the Navbar AND the page (children)
  return (
    <>
      <NavigationBar /> 
      <div className="page-container">
        {children}
      </div>
    </>
  )
}

export default App
