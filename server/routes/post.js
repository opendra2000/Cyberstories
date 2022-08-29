const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const PostMessage = require('../models/postMessage');


//routes
router.get('/', async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (err) {
        res.status(404).json({
            message: err.message
        });
    }
});
router.post('/', async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save((error, doc) => {
            if (error) return console.error(error);
            console.log("Document Inserted Succesfully");
        });

        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({
            message: err.message
        });
    }
});

router.patch('/:id', async (req, res) => { //for updating documents
    const { id: _id } = req.params;
    const post = req.body;
    //checking if id is mongoose object id
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
});

module.exports = router;

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    //checking if id is mongoose object id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted' });
});

router.patch('/:id/like', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id.');

    const post = await PostMessage.findById(id);
    const updated = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount+1}, { new: true });
    res.json(updated);
});