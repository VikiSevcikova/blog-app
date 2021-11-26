import {
    GET_ALL_POSTS,
    ADD_NEW_POST,
    UPDATE_POST,
    DELETE_POST
  } from "../actions/types";
  
  
 const initialState = { posts: [] }

 const postsReducer = (state = initialState, action) => {
    const { type, payload } = action;
  console.log("payload", payload);
    switch (type) {
      case GET_ALL_POSTS:
        return {
          ...state,
          posts: payload,
        };
      case ADD_NEW_POST:
        return {
          ...state,
          posts: [...state.posts, payload]
        };
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map(post => post._id === payload._id ? payload : post)
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload)
        };
      default:
        return state;
    }
  }

export default postsReducer;
