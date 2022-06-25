module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Codeial</h1>')

    // requesting cookies from the browser and printing it in console
    console.log(req.cookies);
    
    // changing the value of cookie
    res.cookie('user_id', 25);
    
    return res.render('home', {
        title: "Home"
    })
}

// module.exports.actionName = function(req, res){}