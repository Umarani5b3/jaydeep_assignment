/**
 * Created by Jaydeep on 6/27/2018.
 */
const express = require('express');
const statusMessage = require('../config/statusMessage.js');
const router = express.Router();
var localStorage = require('localStorage');


router.get('/', function (req, res) {
  try {
    //res.send('Server is running...');
    res.render('home', { title: statusMessage.projectTitle.title })
  }
  catch (err) {
    res.render('error', {messageObj:statusMessage.internalServerError });
  }
});

router.post('/', function (req, res) {
  try {
    res.render('home', { title: statusMessage.projectTitle.title })
  }
  catch (err) {
    res.render('error', {messageObj:statusMessage.internalServerError });
}
});
/* LOGOIN ROUTER */
router.get('/login', function(req, res) {
  res.redirect('/');
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  localStorage.removeItem('user_data');
  req.logout();
  res.redirect('/');
});

module.exports = router;