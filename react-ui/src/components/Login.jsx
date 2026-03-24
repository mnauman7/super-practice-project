import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import authService from '../services/authService'
import './Login.css'

function Login() {
  const [loginCreds, setLoginCreds] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const validateField = (name, value) => {
    let error = ''
    if (!value) {
      error = `${name === 'email' ? 'Email' : 'Password'} is required`
    } else if (value.length < 2) {
      error = `${name === 'email' ? 'Email' : 'Password'} must be at least 2 characters long`
    }
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginCreds(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    setErrorMessage('')
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateField('email', loginCreds.email);
    const passwordError = validateField('password', loginCreds.password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });

    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await authService.loginUser(loginCreds);
      // This line is crucial for your UserTable!
      localStorage.setItem('token', response.token); 
      login(response.token);
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.toString());
    }
  };

  const isFormValid = loginCreds.email.length >= 2 && loginCreds.password.length >= 2

  return (
    <div className="container-fluid login-container">
      <div className="container xd-container">
        <h2>Welcome to Login</h2>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <div className={`form-group has-feedback ${errors.email ? 'has-error' : loginCreds.email && !errors.email ? 'has-success' : ''}`}>
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={loginCreds.email}
                onChange={handleChange}
                onBlur={handleBlur}
                minLength="2"
                required
              />
              <span className={`glyphicon form-control-feedback ${errors.email ? 'glyphicon-remove' : loginCreds.email && !errors.email ? 'glyphicon-ok' : ''}`} aria-hidden="true"></span>
              {errors.email && <span className="help-block">{errors.email}</span>}
            </div>
          </div>
          
          <div className={`form-group has-feedback ${errors.password ? 'has-error' : loginCreds.password && !errors.password ? 'has-success' : ''}`}>
            <label htmlFor="password" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={loginCreds.password}
                onChange={handleChange}
                onBlur={handleBlur}
                minLength="2"
                required
              />
              <span className={`glyphicon form-control-feedback ${errors.password ? 'glyphicon-remove' : loginCreds.password && !errors.password ? 'glyphicon-ok' : ''}`} aria-hidden="true"></span>
              {errors.password && <span className="help-block">{errors.password}</span>}
            </div>
          </div>

          {errorMessage && (
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              </div>
            </div>
          )}

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-default" type="submit" disabled={!isFormValid}>
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

