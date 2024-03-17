const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String, 
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'UserDobby'
    },
   
});

module.exports = mongoose.model('PostDobby', postSchema);
