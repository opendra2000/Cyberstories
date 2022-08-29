//this is our single reducer function
export default (posts = [], action) => {
    switch (action.type) {
        case 'DELETE': 
            return posts.filter( (post) => post._id!= action.payload);
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload]; //spreading our old state and adding the new state
        case 'UPDATE':
        case 'LIKE':
            return posts.map((post) => post._id===action.payload._id ? action.payload : post) //remember map returns an array so that we have the entire posts along with the updated one
        default:
            return posts;
    }
}
