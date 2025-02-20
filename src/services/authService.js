import axios from 'axios';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/login/register', credentials);
    console.log(response,'response')
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  logout: () => {
    localStorage.removeItem('user');
  }
};