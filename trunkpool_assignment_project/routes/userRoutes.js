
/**
 * Created by jaydeep on 6/27/2018.
 */
const express = require('express');
const router = express.Router();
const Request = require('request');
const localStorage = require('localStorage');
const statusMessage = require('../config/statusMessage.js');
const Favorite = require('../app/models/favorite.js');
const _ = require('lodash');

router.get('/dashboard', function(req, res){
  try{
    var userData = JSON.parse(localStorage.getItem('user_data'));
    if(userData.id && userData.token){
      Request.get("https://www.googleapis.com/books/v1/volumes?q=<BOOK_NAME>", function(error, response, body){
        if(error) {
          res.render('error',{messageObj:statusMessage.internalServerError })
        }
        else{
          var booksParsedData = JSON.parse(body);
          console.log("bodykeys",Object.keys(booksParsedData));
          res.render('dashboard', { booksData: booksParsedData.items, title:"dashboard",userData:userData})
        }
      });
    }
    else
    {
      req.redirect('/');
    }
  }
  catch(err)
  {
    res.render('error',{messageObj:statusMessage.internalServerError });
  }
});



router.get('/book-details/:book_id', function(req, res){
  try{
    var userData = JSON.parse(localStorage.getItem('user_data'));
    if(userData.id && userData.token){
      var book_id = req.params.book_id;
      Request.get("https://www.googleapis.com/books/v1/volumes/"+book_id, function(error, response, body){
        if(error) {
          res.render('error',{messageObj:statusMessage.internalServerError })
        }
        else{
          var bookParsedData = JSON.parse(body);
          console.log("bodykeys",Object.keys(bookParsedData)+body);
          res.render('book_details',{bookData:bookParsedData,title:"book detail", userData:userData});
        }
      });
    }
  }
  catch(err)
  {
    res.render('error',{messageObj:statusMessage.internalServerError });
  }
});


router.get('/favorite-books', function(req, res){
  try{
    var userData = JSON.parse(localStorage.getItem('user_data'));
    if(userData.id && userData.token){
      Favorite.findOne({user_id:userData._id}, function(err, dataObj){
        if(err) res.render('error',{messageObj:statusMessage.internalServerError });
        if(dataObj && dataObj.id){
          console.log(dataObj.books[0]);
          res.render('favorites', { favoriteBooks: dataObj.books, title:"Favorites Books",userData:userData})
        }
      })
    }
    else
    {
      res.redirect('/');
    }
  }
  catch(err)
  {
    res.render('error',{messageObj:statusMessage.internalServerError });
  }
});


// blog post
router.post('/favorite-book', function(req, res){
  try{
    var clientData =req.body;
    console.log(clientData.book_id);
    var userData = JSON.parse(localStorage.getItem('user_data'));
    if(userData.id && userData.token){
      Request.get("https://www.googleapis.com/books/v1/volumes/"+clientData.book_id, function(error, response, body){
        if(error) {
          return res.json({err:error});
        }
        else{
          var bookParsedData = JSON.parse(body);
          console.log("bookdatafromfavorite:",Object.keys(bookParsedData));
          Favorite.findOne({user_id:userData._id}, function(err, dataObj){
            if(err) return res.json({err:err});
            if(dataObj && dataObj.id){
              if(clientData.book_id && (_.findIndex(dataObj.books, function(o) { return (o.id == clientData.book_id) })== -1)){
                dataObj.books.push(bookParsedData);
                dataObj.save(function(err, data){
                  if(err) {
                    return res.json({err:err});
                  }
                  else{
                    console.log(data);
                    return res.json(statusMessage.addResponse);
                  }
                });
              }
              else
              {
                console.log(dataObj);
                return res.json(statusMessage.addResponse);
              }
            }
            else
            {
              Favorite.create({
                user_id:userData._id,
                books:[bookParsedData]
              }, function(err, addFavorite){
                if (err) return res.json({err:err});
                else{
                  console.log(addFavorite);
                  return res.json(statusMessage.addResponse);
                }
              })
            }
          })
        }
      });
    }
  }
  catch(err)
  {
    return res.json({err:err});
  }
});

router.post('/un-favorite-book', function(req, res){
  try{
    var clientData =req.body;
    console.log(clientData.book_id);
    var userData = JSON.parse(localStorage.getItem('user_data'));
    if(userData.id && userData.token){
      Favorite.findOne({user_id:userData._id}, function(err, dataObj){
        if(err) return res.json({err:err});
        if(dataObj && dataObj.id){
          if(clientData.book_id && dataObj.books.length){
            dataObj.books = _.reject(dataObj.books, function(e) { return e.id == clientData.book_id; });
            dataObj.save(function(err, data){
              if(err) {
                return res.json({err:err});
              }
              else{
                console.log("dataObj.books"+JSON.stringify(dataObj.books));
                return res.json({bookData:dataObj.books, status: statusMessage.deleteResponse});
              }
            });
          }
          else
          {
            console.log(dataObj);
            return res.json(statusMessage.deleteResponse);
          }
        }
        else
        {
          return res.json(statusMessage.deleteResponse);
        }
      })
    }
  }
  catch(err)
  {
    return res.json({err:err});
  }
});

router.post('/search-book-by-title', function(req, res){
  try{
    var clientData =req.body;
    var userData = JSON.parse(localStorage.getItem('user_data'));
    console.log(clientData.search_keyword);
    if(userData.id && userData.token){
      Request.get("https://www.googleapis.com/books/v1/volumes?q=<"+clientData.search_keyword+">", function(error, response, body){
        if(error) {
          return res.json({err:error})
        }
        else{
          var bookParsedData = JSON.parse(body);
          //res.render('dashboard', { booksData: bookParsedData.items, title:"dashboard",userData:userData});
          return res.json({bookData:bookParsedData.items, status:statusMessage.getResponse});
        }
      });
    }
  }
  catch(err)
  {
    res.render('error',{messageObj:statusMessage.internalServerError,err:err });
  }
});



module.exports = router;
