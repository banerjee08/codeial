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

// import express-session which is used for session cookie
const session = require('express-session')

// import Passport
const passport = require('passport')

// import strategy
const passportLocal = require('./config/passport-local-strategy')

// import mongo-store
const MongoStore = require('connect-mongo');

// import SASS
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}))
// app.use(session({
//     secret: 'foo',
//     store: MongoStore.create(db)
// }))

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

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// add a middleware which takes in the session cookie and encrypts it
// mongo store is used to store the session cookie in the db
// app.use(session({
//     name: 'codeial',
//     // TODO change the secret before deployment in production mode
//     secret: "blahsomething",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: new MongoStore({
//         mongooseConnection: db, 
//         autoRemove: 'disabled'
//     },
//     function(err){
//         console.log(err || 'connect-mongodb setup ok');
//     })
// }));

// setting up mongo store
app.use(session({
    secret: 'shhhhhhhhhhhhhhht',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/codeial_development',
    })
  }))

// we need to tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

// - This function gets called after the passport is initialised to check whether a session cookie is present or not. This function is automatically called as a middleware

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
})