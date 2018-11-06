const express = require('express');
require('dotenv').config()

var path = require('path');

var cookieParser = require('cookie-parser');
var formParser = require('express-form-data');
var session = require('cookie-session');

var passport = require('passport');
var mongoose = require('mongoose');

var cors = require('cors');

var apiRouter = require('./routes/api/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(formParser.format());
app.use(formParser.stream());
app.use(formParser.union());
app.use(session({
  name: 'patria',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUnininitializes: true
}));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(passport.initialize());
app.use(passport.session());

const mongodb = 'mongodb://admin:' + process.env.DB_SECRET + '@ds151943.mlab.com:51943/patria';
mongoose.connect(mongodb, {useNewUrlParser: true});
mongoose.Promise=global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, '\033[1;33m[mongodb]\033[0m '));

app.use('/api/', apiRouter);
app.get('*', (req, res) => {
  console.log('\033[1;34m[router] GET \'/*\'\033[0m');
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const port = process.env.PORT | 8000;

console.log("\033[1;36m[express] Listening on port", port, "\033[0m");

app.listen(port);
