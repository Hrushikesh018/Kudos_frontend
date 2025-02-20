import axios from 'axios';
export const kudosService = {
    getKudos: async () => {
      try {
        const response = await axios.get('/api/kudos/newsfeed');
        console.log(response.data,'response')
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
    createKudo: async (kudoData) => {
      try {
        const response = await axios.post('/api/kudos/give-kudos', kudoData);
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
    getAnalytics: async () => {
      try {
        const response = await axios.get('/api/leaderboard');
        console.log(response)
        return response.data;
      } catch (error) {
        throw error.response?.data || error.message;
      }
    },
    getAllUsers: async (data) => {
        const response = await axios.post('/api/users',data);
        return response.data; // Adjust based on API response format
      },
    
      getAllCategories: async () => {
        const response = await axios.get('/api/kudos/categories');
        return response.data; // Adjust based on API response format
      },
      likePost:async(kudoId,userId)=>{
       const response = axios.post(`/api/kudos/like/${kudoId}`, {
            userId: userId, // Replace with actual logged-in user ID
          });
          return response
      },
      getMostLiked:async()=>{
        const response = await axios.get('/api/kudos/most-liked');
        return response.data; // Adjust based on API response format
      }
  };