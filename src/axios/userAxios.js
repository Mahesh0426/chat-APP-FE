import axios from "axios";

const URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/user`;

// Create a new user with given payload.
export const createUser = async (payload) => {
  try {
    const res = await axios.post(`${URL}/register`, payload);
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    // re-throw so caller can handle it
    throw error;
  }
};

//login with email
export const loginWithEmail = async (email) => {
  try {
    const res = await axios.post(`${URL}/checkemail`, { email });
    // console.log("res:", res.data.message);
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

//login with password
export const loginWithPassword = async (password, userId) => {
  try {
    const res = await axios.post(
      `${URL}/checkpassword`,
      { password, userId },
      { withCredentials: true }
    );
    // console.log("res:", res.data.message);
    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

//get user details
export const getUserDetails = async () => {
  try {
    const res = await axios.get(`${URL}/userdetails`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};
