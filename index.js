// require express
const express = require('express');

// cookie-parser
const cookieParser = require('cookie-parser');

const app = express();

// define port
const port = 8000;

// express layout library
const expressLayouts = require('express-ejs-layouts');

// require mongoose
const db = require('./config/mongoose')

// reading through the POST request
app.use(express.urlencoded());

// setting up the cookie-parser
app.use(cookieParser());

// tell node to include link tag in the header section
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Static files
app.use(express.static('./assets'));

// use the library
app.use(expressLayouts);

// use express router
app.use('/', require('./routes'));

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
})