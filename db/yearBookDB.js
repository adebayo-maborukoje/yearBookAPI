var mongoose = require('mongoose');
database = 'mongodb://localhost/yearBook';
if(process.env.NODE_ENV === 'production'){
  database = 'mongodb://yearbook:yearbook@ds063870.mongolab.com:63870/yearbook';
}
mongoose.connect(database);

var uniqueValidator = require('mongoose-unique-validator');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Not Connected to Database'));
db.once('open', function(){
  console.log('connected to a DataBase');
});

var gracefulShutdown =  function ( msg, callback) {
  db.close(function(){
    console.log("Mongoose disconnected through " + msg);
    callback();
  }); 
};

process.once('SIGUSR2', function (){
  gracefulShutdown('nodemon restart', function (){
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination 
process.on('SIGINT', function() { 
  gracefulShutdown('app termination', function () { 
  process.exit(0); 
  }); 
}); 
Schema = mongoose.Schema;
var yearBookSchema = new Schema({
  firstname: {type:String, required:true, trim:true},
  lastname: {type: String, required:true, trim:true},
  username: {type: String, required:true, trim:true, unique:true},
  nickname: {type: String, default: "No Nick Name"},
  mobile :  [{type: Number}],
  birthday : {type: Date},
  occupation:{type: String, default: "Self-Employed"},
  organisation:{type:String, default: "No Organisation"},
  marital: {type: String, default: "single" }, 
  avatar :{type:String, default: "https://bootstrapmaster.com/wp-content/themes/bootstrap/img/avatars/noavatar.png"},
  graduation:{type:Number, default: 2005},
  date: {type: Date, default: Date.now},
  email: {type: String},
});

yearBookSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email.text); 
}, 'The e-mail field cannot be empty.');
yearBookSchema.plugin(uniqueValidator);
mongoose.model('yearBook', yearBookSchema);