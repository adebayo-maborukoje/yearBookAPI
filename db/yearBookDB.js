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
  password:{type: String, required:true},
  nickname: {type: String, default: "No Nick Name"},
  mobile :  [{type: Number}],
  birthday : {type: String},
  occupation:{type: String, default: "Self-Employed"},
  organisation:{type:String, default: "No Organisation"},
  marital: {type: String, default: "single" }, 
  avatar :{type:String, default: "https://bootstrapmaster.com/wp-content/themes/bootstrap/img/avatars/noavatar.png"},
  date: {type: Date, default: Date.now},
  bio :{type:String},
  email:{type: String, trim:true,},
  interest: {type: String},
  specialization: [{type: String}],
  portfolio: {type: String},
  twitter: {type: String},
  facebook: {type:String},
  linkedin :{type: String}
});

yearBookSchema.plugin(uniqueValidator);
mongoose.model('yearBook', yearBookSchema);

// module.exports = yearBookSchema;