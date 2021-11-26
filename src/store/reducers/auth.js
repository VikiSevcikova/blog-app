import {
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";
  
  const token = localStorage.getItem("blog-token");
  
  const initialState = token
    ? { isLoggedIn: true, user: null }
    : { isLoggedIn: false, user: null };
  
 const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USER_SUCCESS:
        return {
          ...state,
          user: payload,
        };
      case GET_USER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case SIGNUP_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }

export default authReducer;
