var express = require('express');

module.exports=function(passport){
 var router=express.Router();
 router.get('/',function(req,res){
 	console.log('test');
 })
 return router
}
