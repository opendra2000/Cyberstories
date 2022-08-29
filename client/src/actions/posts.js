import * as api from '../api/index';

//We are going to describe actions

export const getPosts = () => async (dispatch) => {

    try {
        //we destrucure our data from the response 
        const { data } = await api.fetchPosts();
        const action = {
            type: 'FETCH_ALL',
            payload: data
        }
        dispatch(action);
    } catch (err) {
        console.error(err);
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        const action = { type: 'CREATE', payload: data };
        dispatch(action);
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id, post);
        dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
        console.log(error);
    }
}