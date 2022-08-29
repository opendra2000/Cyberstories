import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currId, setId }) => {
    //using useState hook to keep tbe state of the form component
    const [postData, setPostData] = useState({ creater: '', title: '', story: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currId ? state.posts.find((post) => post._id === currId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();

    //when our post value chages then we want to do something 
    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    
    const clear = () => {
        setId(null);
        setPostData({ creater: '', title: '', story: '', tags: '', selectedFile: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currId) {
            dispatch(updatePost(currId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();

    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currId ? `Editing "${postData.title}"` : 'Post Your Cyber Crime Story'}</Typography>
                <TextField name="creater" variant="outlined" label="Creater" fullWidth value={postData.creater} onChange={(e) => setPostData({ ...postData, creater: e.target.value })} />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="Story" variant="outlined" label="Story" fullWidth multiline rows={4} value={postData.story} onChange={(e) => setPostData({ ...postData, story: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;