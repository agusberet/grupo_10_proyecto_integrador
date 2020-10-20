var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home');
});

router.get('/Home', function(req,res){
  res.render('Home');
});

router.get('/productDetail', function(req, res) {
  res.render('productDetail');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

module.exports = router;
