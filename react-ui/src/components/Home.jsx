import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome Home</h1>
        <button onClick={handleLogout} className="btn btn-default">
          Logout
        </button>
      </div>
      <div className="home-content">
        <p>This is a blank home page.</p>
      </div>
    </div>
  )
}

export default Home

