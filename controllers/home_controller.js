const Post = require('../models/post');

module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial</h1>')

    // requesting cookies from the browser and printing it in console
    // console.log(req.cookies);
    
    // changing the value of cookie
    // res.cookie('user_id', 25);
    
    // query to return all the posts
    Post.find({}, function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        })
    })
}

// module.exports.actionName = function(req, res){}