var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../db/yearBookDB');
var bodyParser = require('body-parser');
var yearBook = mongoose.model('yearBook');
// var multer = require('multer');

// router.route('/upload')
// .post( function(req,res){
//   if(done==true){
//     res.json(req.files.thumbnail.path);
//   } else {
//       res.json('not uploaded');
//     }
//   });

router.route('/')
.get(function (req, res){
  yearBook.find({}, '-_id -__v', function(err, data){
    if(err){
          res.json({
          message: "ERROR FETCHING DATA",
          status: 302
        });
      // return errorHandler(err);
    }else if(data.length < 1){
      res.json ({
        message : "FILE NOT FOUND",
        status: 404
      })
    }
    else{

    res.json(data);
   }
  });
})
.post(function (req, res){
  var newMember = req.body;
    yearBook.create(newMember, function (err, newMember){
    if(err){
            res.json({
              message: err,
              status: 403
            });
      // return errorHandler(err);
    }
    res.json(newMember);
  });
});

  
router.route('/:username')
.get(function (req, res){
  var query = req.params.username; //see if you can move this outside
  yearBook.find({username: query}, '-_id -__v', function(err, member){
    if(err){
          res.json({
          message: "ERROR FETCHING DATA",
          status: 302
        });
      // return errorHandler(err);
    }else if(member.length < 1){
      res.json ({
        message : "FILE NOT FOUND",
        status: 404
      });
    }
    else{

    res.json(member);
   }
  });
})
.put(function (req, res){
  var query = req.params.username;
  yearBook.findOneAndUpdate({username:req.params.username}, req.body, function (err, EditMember){
    if(err){
    //  return errorHandler(err);
   res.status(302).send("request Cannot  be completed at the moment");
    // res.json({
    //   message: "request Cannot  be completed at the moment",
    //   status: 302
    // });
    }
  res.json(EditMember);
  //   else {
  // yearBook.name = yearBook.name || EditMember.name;
  // yearBook.username = yearBook.username||req.body.name;
  // yearBook.nickname = yearBook.nickname||req.body.nickname;
  // yearBook.mobile = yearBook.mobile||req.body.mobile;
  // yearBook.birthday = yearBook.birthday||req.body.birthday;
  // yearBook.occupation = yearBook.occupation||req.body.occupation;
  // yearBook.organisation = yearBook.organisation||req.body.organisation;
  // yearBook.marital = yearBook.marital||req.body.marital;
  // yearBook.avatarURL = yearBook.avatarURL||req.body.avatarURL;
  // yearBook.graduation= yearBook.graduation||req.body.graduation;
  //   }
  });
 })
.delete(function (req, res){
  var query = req.params.username;
  yearBook.findOneAndRemove({username:req.params.username}, function (err, member){
    if(err){
        return res.status(302).send(err);
    }else if(member.length < 1){
      res.json({
        message: "NO USER FOUND",
        status: 404
      });
    }else{
    res.send('THE USER WAS DELETED SUCCESSFULLY');
    }
  });
});
// function parser(name){
//   var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
//   return parsedName;
// }
// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.render('error', { error: err });
// }
module.exports =router;