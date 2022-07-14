// module.exports.posts = function(req, res){
//     res.end('<h1>Posts of User</h1>')
// }

// created an action to get the data from the browser
const Post = require('../models/post')

module.exports.create = function(req, res){
    // creating a post
    Post.create({
        content: req.body.content,
        // passing on the user
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back')
    });
}