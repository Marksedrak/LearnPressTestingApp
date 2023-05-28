
const URL = 'https://myselena.org'
import axios from "axios";

// This function validates the token
export default validateToken =  async (token) => {
    try {
      const response = await axios.post(
        `${URL}/wp-json/learnpress/v1/token/validate`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );

      console.log(response.data.message + " Message from validate");
      return true;  
    } catch (error) {
      console.log(error);
    }
};