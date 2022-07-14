const mongoose = require('mongoose');

// creating a Schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user:{
        // linking post to user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;