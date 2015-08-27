var express = require('express');
var router = express.Router();
var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated())
	    return next();
	  res.redirect('/');
		}	
/* GET home page. */
module.exports=function(passport){
	router.get('/', function(req, res, next) {
		//var testvar=req.app.get(str);
		//console.log(testvar);
	 	var str1=req.app.locals.testvar;
	 	//var str2=app.get('test');
	 	console.log(str1);
	 	//console.log(str2);
	  res.render('index');
	});
	router.get('/login',function(req,res){
		res.render('login');
	})
	router.post('/login',passport.authenticate('login',{
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.get('/signup',function(req,res){
		res.render('signup',{message: req.flash('message')});
		// var email=req.body.email;
		// var password=req.body.password;
		// console.log("username: "+email);
		// console.log("pass: "+password);
		// res.render('signup');
	});
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));
		router.get('/test',function(req,res){
		res.render('home');
	})
	router.get('/signout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});

	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
	  passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
	  passport.authenticate('facebook', {
	    successRedirect : '/home',
	    failureRedirect : '/'
	  })
	);

	router.get('/unlink/facebook',function(req,res){
		cosole.log('unlinking facebook@#$%^&*I()');
	})
	router.get('/home', isAuthenticated, function(req, res){
		//res.send({user:req.user});
		res.render('home', { user: req.user });
	});

	
	return router;
}
