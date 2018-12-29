const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create ninja schema & model

const UserSchema = new Schema({
// name:{
//
//   type:String,
//   //required:[true,'Name field is required']
// },
email:{
  type:String
},
password:{
  type:String
},

firstname:{

  type:String,
  //required:[true,'mobile_no field is required']
},
lastname:{

  type:String,
  //required:[true,'mobile_no field is required']
},
userid:{
  type:String,
  //default: ''
},
timestamp: {
    type: Date,
    default: Date.now()
  },
gender:{

  type:String,
  //required:[true,'mobile_no field is required']
},
address:{

  type:String,
  //required:[true,'mail_id field is required']
},
photo:{
  data: Buffer, contentType: String
  //type:String,
  //required:[true,'mobile_no field is required']
},
isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }


//add in geo location

});
const User = mongoose.model('user',UserSchema);
module.exports = User;
