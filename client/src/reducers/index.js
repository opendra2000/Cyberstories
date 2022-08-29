import { combineReducers } from 'redux';
import posts from './posts';

//here we combine different reducers that we are going to use
export default combineReducers({ posts: posts });