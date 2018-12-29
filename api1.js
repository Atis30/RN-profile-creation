//const express = require('express');
//const multer  = require('multer');
const User = require('../models/user');
var Express = require('express');
var express = require('express')
var multer  = require('multer')
const router = express.Router();
var fs = require('fs-extra');
//var multer = require('multer');
//var bodyParser = require('body-parser');
//var upload = multer({ dest: 'uploads/' })
//const userid = user._id;
//get the list of ninjas from database
//var app = Express();
//app.use(bodyParser.json());
// var Storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, "D:/npmwork/backend/Upload");
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });
// var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
// //array(fieldname[, maxCount])
// // app.get("/", function (req, res) {
// //     res.sendFile(__dirname + "/index.html");
// // });
// app.post("/api1/users/photo",function(req,res){
//  var newItem = new Item();
//  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//  newItem.img.contentType = "image/png";
//  newItem.save();
// });
// app.post("/api1/users/photo", function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//             return res.end("Something went wrong!");
//         }
//         return res.end("File uploaded sucessfully!.");
//     });
// });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0].replace(/ /g,'') + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
  });
  var upload = multer({ storage: storage });
var app = express()
app.use(express.static('uploads'));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type");
    next();
  }

  app.use(allowCrossDomain);
app.post("/uploads/", upload.array("files[]", 12), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
});
app.get("/file/download/:fileName",function(req, res){
  console.log(">>>>>>",req.params.photo);
  fs.readFile("/uploads/"+req.params.photo,function(err,data){
    if(err==null){
      res.setHeader('Content-disposition','attachment; filename='+req.params.photo);
      res.write(data,'binary');
      res.end();
    }
  });
});

 router.get('/users', function(req,res){
  User.find({}).then(function(user){
    res.send(user);
  });
});
// Router.post('/users', (req, res) => {
// 	var body = req.body;
// 	var user = new User(body);
// 	user.save().then(()=>{
// 		return user.generateAuthToken();
// 	}).then((token)=>{
// 		res.header('x-auth', token).send(user);
// 	}).catch((e)=>{
// 		res.send(e);
// 	});
// });
router.post('/users', function(req,res){
    //var user = new User();
    //user.email = req.body.user.username;
    User.create({email:req.body.email, password:req.body.password}).then(function(user){
  user.save({}).then(function(user){
    res.send(user);
  });
});
});
// router.post('/users', function(req,res){
// User.find({mailid: req.body.mailid, password:req.body.password}).then(function(user){
// res.send(user);
// });
// });
//add a new ninja to the db
router.post('/users/login', function(req,res){
User.find({email: req.body.email , password:req.body.password}).then(function(user){

    console.log(user);
    res.send(JSON.stringify(user));

});
});
// router.post('/uploads', function(req,res,next){
//   console.log("bodyData<<<<<",req.body);
//   User.findByIdAndUpdate({_id: req.body._id},req.body).then(function(user){
// //User.find({email: req.body.email , password:req.body.password}).then(function(user){
//
//     console.log(user);
//     res.send(JSON.stringify(user));
//
// });
// });

// router.post('/users/login/:id', function(req,res,next){
// User.find({email: req.body.email , password:req.body.password}).then(function(){
//   User.findOne({_id:req.params.id}).then(function(user){
//     //console.log(req.params.id);
//     res.send(user);
//   });
// });
// });

//  router.post('/users/Signup', function(req,res){
// User.find({email: req.body.email, password:req.body.password}).then(function(user){
// res.send(user);
// });
// });
// router.post('/users/', function(req,res){
//  User.create({_id:req.params.id},req.body).then(function(){
//    User.findOne({_id:req.params.id}).then(function(user){
//      res.send(user);
//    });
//
//  });
//  });

//update a ninja in the db
router.put('/users/updateProfile', function(req,res,next){
  console.log("bodyData<<<<<",req.body);
  User.findByIdAndUpdate({_id: req.body._id},req.body).then(function(user){

console.log(user);
      res.send(JSON.stringify(user));



  });
});
// router.put('/users/:id', function(req,res){
//   User.findById(req.params.id, function(err, user) {
//
//             if (err)
//                 res.send(err);
//
//             user.firstname = req.body.firstname;
//             user.lastname = req.body.lastname;  // update the bears info
//
//             // save the bear
//             user.save(function(err) {
//                 if (err)
//                     res.send(err);
//
//                 res.send(user);
//             });
//
//         });
//     });

router.delete('/users/:id', function(req,res,next){
  User.findByIdAndRemove({_id:req.params.id}).then(function(user){
  res.send(JSON.stringify(user));
});

});

module.exports = router;
