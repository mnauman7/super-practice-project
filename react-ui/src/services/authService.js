import axios from 'axios'

const API_BASE_URL = 'http://localhost:5050'

const authService = {
  loginUser: async (loginCreds) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginCreds)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || error.message || 'Login failed'
    }
  }
}

export default authService

