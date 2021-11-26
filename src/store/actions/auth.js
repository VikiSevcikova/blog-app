import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
  } from "./types";
  
import { signup, login, getCurrentUser } from "../../services/AuthService";
  

export const getUser = () => async (dispatch) => {
    try{
      const {data} = await getCurrentUser();
      dispatch({
          type: GET_USER_SUCCESS,
          payload: data.user
        });
  
        return data;
    }catch(error){
      const message =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      dispatch({
          type: GET_USER_FAIL,
      });

      dispatch({
          type: SET_MESSAGE,
          payload:  {message: message, variant: "danger"}
      });

      return Promise.reject();
    }
};

  export const signupUser = (username, email, password) => async (dispatch) => {
      try{
        const response = await signup(username,email,password);
        dispatch({
            type: SIGNUP_SUCCESS,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: {message: response.data.message, variant: "light"}
          });
    
          return response;
      }catch(error){
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: SIGNUP_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload:  {message: message, variant: "danger"}
        });
      }
  };
  
  export const loginUser = (email, password) => async (dispatch) => {
    try{
        const response = await login(email,password);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.user
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload:  {message: response.data.message, variant: "light"}
          });
      }catch(error){
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload:  {message: message, variant: "danger"}
        });
      }
  };
  
  export const logoutUser = () => async (dispatch) => {
    try{
        localStorage.removeItem("blog-token");
        dispatch({
            type: LOGOUT,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload:  {message: "You were successfully logged out.", variant: "light"}
          });
    
      }catch(error){
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: SET_MESSAGE,
            payload:  {message: message, variant: "danger"}
        });

      }
  };