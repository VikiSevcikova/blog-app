import authReducer from "./auth";
import postsReducer from "./posts";
import { combineReducers } from "redux";
import messageReducer from "./message";

const allReducers = combineReducers({
    auth : authReducer,
    message:  messageReducer,
    posts : postsReducer 
})

export default allReducers;