var express = require('express');
var session = require('express-session');
var getAuth = require('./src/googleApi/googledrive');
var googleApi = require('./src/googleApi/googleApi');
var path = require('path');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var ba = require('axios');
const url = require('url');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var db = require('./db');
var app = express();
var port = 3000

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
       db.users.findByProfile(profile.id , function (err, user) {
         return done(err, user);
       });
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  db.users.findByProfile(user.prof, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({secret: "Shh, its a secret!"}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, '/src')));

app.get("/", function (req, res) {
  // console.log(req.flash('userInfo'))
  res.sendFile(__dirname + '/index.html')
})

// Interacting to google drive and get folders names and id`s
app.get("/getFolders", function (req, res) {
  getAuth.Auth(googleApi.getFolders);
})

// Interacting to google drive and get files names with id`s
app.get("/getFiles", function (req, response) {
  getAuth.Auth(googleApi.getFiles).then((res) => {
    var files = JSON.stringify(res);
    response.send(files);
  })
})

// Interacting to google drive and get files by folders
app.get("/getFilesByFolders", function (req, res) {

})

// Interacting to google drive and add tag name
app.post("/addTag", function (req, res) {
  var params = { tagName: "DanielHagever" };
  getAuth.Auth(googleApi.addTag, params);
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect("/bla");
  });

app.get("/bla", function (req, res) {
  // console.log(req.flash('userInfo'))
  res.send({username: req.session.passport.user.displayName})
})


// Starting the node server
app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> Listening on http://localhost:%s/ ", port)
  }
})