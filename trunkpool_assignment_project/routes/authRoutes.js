/**
 * Created by jaydeep on 6/27/2018.
 */
const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');
var localStorage = require('localStorage');

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile']  }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    try{
      console.log(req.user);
      localStorage.setItem('user_data',JSON.stringify(req.user));
      res.redirect('/user/dashboard');
    }
    catch(err) {
      localStorage.removeItem('user_data');
      res.redirect('/')
    }
  });
module.exports = router;
