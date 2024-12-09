import axios from "axios";



export const getProfile = async (token) => {
  try {
    const response = await axios.get("http://localhost:4000/api/v1/students/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getProfile:", error.response || error);
    throw error;
  }
};


export const updateProfile = async (token, updatedData) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/v1/students/profile", // Make sure this URL matches
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      return response.data; // Return server response
    } catch (error) {
      console.error("Error in updateProfile:", error.response || error);
      throw error; // Re-throw error to be caught in the component
    }
  };
  
