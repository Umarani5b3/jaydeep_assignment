/**
 * Created by Jaydeep on 6/27/2018.
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const dbConfig = require('./config/db.js');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/indexRoute.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const serverConfig = require('./config/server.js');
const statusMessage = require('./config/statusMessage.js');

// Load express app
const app = express();

mongoose.connect(dbConfig.database);
mongoose.connection.on('connected', function () {
  console.log("DB connected at: " + dbConfig.database);
});
mongoose.connection.on('disconnected', function () {
  console.log("DB disconnected at: " + dbConfig.database);
});
mongoose.connection.on('error', function (err) {
  console.log("DB Error: " + err);
});

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//set middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.get('*', function(req, res){
  res.render('error', {messageObj:statusMessage.pageNotFound });
});

//setting up passport strategy


//local server or network hosted server

if (serverConfig.mode === "l") {
  app.listen(serverConfig.port, function () {
    console.log("Server at " + serverConfig.domain + ":" + serverConfig.port);
  });
}
else {
  app.listen(serverConfig.port, '0.0.0.0', function () {
    console.log("Server at " + serverConfig.domain + ":" + serverConfig.port);
  });
}