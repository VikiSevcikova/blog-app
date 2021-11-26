import {
    GET_ALL_POSTS,
    ADD_NEW_POST,
    DELETE_POST,
    UPDATE_POST,
    SET_MESSAGE
  } from "./types";
  
import { addNew, getAll, update, deletePostById } from "../../services/PostsService";
  
export const getAllPosts = () => async (dispatch) => {
    try{
      const data = await getAll();
      dispatch({
          type: GET_ALL_POSTS,
          payload: data.posts
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
          type: SET_MESSAGE,
          payload:  {message: message, variant: "danger"}
      });
    }
};

  export const addNewPost = (post) => async (dispatch) => {
      try{
        console.log("addnewpost", post)
        const data = await addNew(post);
        console.log("add", data)
        dispatch({
            type: ADD_NEW_POST,
            payload: data.post
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: {message: data.message, variant: "light"}
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
            type: SET_MESSAGE,
            payload:  {message: message, variant: "danger"}
        });
      }
  };
  
  export const deletePost = (id) => async (dispatch) => {
    try{
        const data = await deletePostById(id);
        console.log("delete", data)

          dispatch({
            type: DELETE_POST,
            payload: data.id
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload:  {message: data.message, variant: "light"}
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
            type: SET_MESSAGE,
            payload:  {message: message, variant: "danger"}
        });

      }
  };
  
  export const updatePost = (id, post) => async (dispatch) => {
    try{
        const data = await update(id, {...post});
        console.log("update", data)

          dispatch({
            type: UPDATE_POST,
            payload: data.post
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload:  {message: data.message, variant: "light"}
          });
    
          return data
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