const express = require('express');
const bodyParser = require('body-parser');
//var fs = require(‘fs’);
const mongoose=require('mongoose');
//const routes = require('./routes/api');
//set up express app

const app = express();
//connect to mongodb
mongoose.connect('mongodb://localhost/userprofile' );
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
mongoose.Promise=global.Promise;
app.use(express.static('public'));

app.use(bodyParser.json());
//initialize routes
app.use('/api1',require('./routes/api1'));
//app.use('/api1/users/',require('./routes/api1/users'));

//listen for requests

app.listen(process.env.port||4000,function(){
  console.log('now listening for requests');
});
