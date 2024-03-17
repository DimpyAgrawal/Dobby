const express = require('express');

const router = express.Router();
const Post = require('../model/Post');
const authenticate = require('../middleware/middleware')

router.post('/posts', authenticate, async(req,res)=>{
    console.log('inside posts route of posting image');
    const{body,image} = req.body;
    if(!body||!image){
        return res.send({error:'fill the complete details'});
    }
    console.log(body+" "+image+" "+req.user._id);

    try{
        console.log('inside try');
        const newPost = new Post({
            body,
            photo:image,
            postedBy:req.user._id,
        })
        const savedPost = await newPost.save();
        console.log(savedPost);
        console.log('try completed');
        res.status(201).send(savedPost); 
 
    }catch(error){
        return res.status(400).send({message: error})
    }
});
router.get('/posts/:userId', authenticate, async (req, res) => {
    try {
        // Get the ID of the current user from the request object
        const userId = req.user._id;

        // Query the database for posts uploaded by the current user
        const posts = await Post.find({ postedBy: userId, photo: { $exists: true, $ne: null } })
            .populate('postedBy', '_id name') // Populate the 'postedBy' field with user details
            .exec();

        // Return the fetched posts as a JSON response
        res.status(200).json(posts);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;