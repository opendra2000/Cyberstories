//for making http request to our server
const axios = require('axios');

const url = 'http://localhost:3001/posts';
//we have our backend server in 3001 and posts is just a endpoint for our api call

//for fetching data from our server's endpoint
export const fetchPosts = () => axios.get(url);

//for making a post request on our backend server once we click submit
export const createPost = (newPost) => axios.post(url, newPost);

//for updating posts on our backend server
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`);

//deleting posts 
export const deletePost = (id) => axios.delete(`${url}/${id}`);

//liking posts
export const likePost = (id) => axios.patch(`${url}/${id}/like`);