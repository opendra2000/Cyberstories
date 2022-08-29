import React from 'react';

//we import useSelector so that we can access our data from redux
import { useSelector } from 'react-redux';

//for making cards we need to import the following 
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './post/post';
import useStyles from './styles';

const Posts = ({setId}) => {
    const posts = useSelector(state => state.posts);
    const classes = useStyles();

    return (
            !posts.length ? <CircularProgress /> : (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}> 
                    {
                        posts.map((post) => (
                            <Grid key={post._id} item xs={12} sm={6}>  
                                <Post post={post} setId={setId}/>
                            </Grid>
                        ))
                    }
                </Grid>
            )
    );
}


export default Posts;
