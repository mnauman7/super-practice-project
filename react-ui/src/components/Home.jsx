import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar' 
import './Home.css'

function Home() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="home-page-wrapper">
      <Navbar onLogout={handleLogout} />

      <div className="home-container">
        <div className="home-header">
          <h1>Welcome Home</h1>
        </div>
        <div className="home-content">
          <p>This is a blank home page.</p>
        </div>
      </div>
    </div>
  )
}

export default Home