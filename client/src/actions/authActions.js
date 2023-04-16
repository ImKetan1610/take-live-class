import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://takeliveclass-server.onrender.com/api/user/login",
      { username, password }
    );
    const token = response.data.token;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://takeliveclass-server.onrender.com/api/user/register",
      userData
    );
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload: error.response.data,
    });
  }
};
