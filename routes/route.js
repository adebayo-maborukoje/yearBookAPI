var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../db/yearBookDB');
var bodyParser = require('body-parser');
var yearBook = mongoose.model('yearBook');

router.route('/')
.get(function (req, res){
  yearBook.find({}, '-_id -__v', function(err, data){
    if(err){
      res.status(500).send(err);
      // return errorHandler(err);
    }

    res.json(data);
  });
})
.post(function (req, res){
  var newMember = req.body;
    yearBook.create(newMember, function (err, newMember){
    if(err){
            res.send(err);
      // return errorHandler(err);
    }
    res.json(newMember);
  });
});

  
router.route('/:username')
.get(function (req, res){
  var query = parser(req.params.username); //see if you can move this outside
  yearBook.find({username: query}, '-_id -__v', function(err, member){
    if(err){
      // return errorHandler(err);
          res.status(500).send(err);
    }
    res.json(member);
  });
})
.put(function (req, res){
  var query = parser(req.params.username);
  yearBook.findOneAndUpdate({username:req.params.username}, req.body, function (err, EditMember){
    if(err){
    //  return errorHandler(err);
  res.status(500).send(err);
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
  var query = parser(req.params.username);
  yearBook.findOneAndRemove({username:req.params.username}, function (err){
    if(err){
      return errorHandler(err);
         res.status(500).send(err);
    }
    res.send('THE USER WAS DELETED SUCCESSFULLY');
  });
});
function parser(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}
// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.render('error', { error: err });
// }
module.exports =router;