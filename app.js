var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require('./routes/route');
// var multer = require('multer');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
// app.use(express.session({ secret: 'maborukoje' }));
app.use(passport.initialize());
app.use(passport.session());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    next();
};

app.use(allowCrossDomain);
// app.use(multer({dest: './uploads/',
//   rename: function (fieldname, filename){
//   return filename+Date.now();
//   },
//   onFileUploadStart: function (file) {
//   console.log(file.originalname + ' is starting ...')
//   },
//   onFileUploadComplete: function (file) {
//   console.log(file.fieldname + ' uploaded to  ' + file.path)
//   done=true;
// }
// }));
// app.post('/yearBook/upload', function(req,res){
//   if(done==true){
//     res.json(req.files.thumbnail.path);
//   } else {
//       res.json('not uploaded');
//     }
//   });

  

app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));

app.get('/', function (req, res){
  res.redirect('/yearBook');
});

app.use('/yearBook', routes);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function (){
  console.log("Node app is running at localhost:"+ app.get('port'));
})