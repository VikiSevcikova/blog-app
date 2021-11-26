import {
    GET_ALL_POSTS,
    ADD_NEW_POST,
    UPDATE_POST,
    DELETE_POST,
    SEARCH_POSTS
  } from "../actions/types";
  
  
 const initialState = { posts: [], filteredPosts: [] }

 const postsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_POSTS:
        return {
          ...state,
          posts: payload,
          filteredPosts: payload,
        };
      case ADD_NEW_POST:
        return {
          ...state,
          posts: [...state.posts, payload],
          filteredPosts: [...state.posts, payload]
        };
      case UPDATE_POST:
        return {
          ...state,
          posts: state.posts.map(post => post._id === payload._id ? payload : post),
          filteredPosts: state.filteredPosts.map(post => post._id === payload._id ? payload : post)
        };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload),
          filteredPosts: state.filteredPosts.filter(post => post._id !== payload),
        };
      case SEARCH_POSTS:
        return {
          ...state,
          filteredPosts: state.posts.filter(post => post.title.toLowerCase().includes(payload.toLowerCase()) || post.description.toLowerCase().includes(payload.toLowerCase()))
        };
      default:
        return state;
    }
  }

export default postsReducer;
