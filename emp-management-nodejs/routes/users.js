var express = require('express');
var router = express.Router();
var dbHelper = require('../Helpers/dbHelper')
var employeeSchema = require('../Models/employeeSchema');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
// Passport configuration
passport.use(new LocalStrategy(
  async function (username, password, done) {
    let user = await employeeSchema.findOne({ email: username })
    if (user) {
      if (user.block == true) {
        done(null, false, { message: "User is blocked" })
        return;
      }
      bcrypt.compare(password, user.password).then((data) => {
        if (data) {
          done(null, user, { user: data });
          return;
        }
        else {
          done(null, false, { message: 'Invalid login' })
          return;
        }
      })
    }
    else {
      done(null, false, { message: 'Invalid login' })
      return;
    }
  }
));
/* Employee Login */
router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => {
  //Creating JWT token
  var token = jwt.sign({ id: req.user._id }, 'secret');
  res.send({ msg: "Login Success", user: req.user, token: token });
})
//Listing Employee details
router.get('/list-employee/:id', (req, res) => {
  dbHelper.listEmployee(req.params.id).then((data) => {
    console.log(data);
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//Edit Details
router.post('/edit-details/:id', (req, res) => {
  dbHelper.editDetails(req.params.id, req.body).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.status(400).json(err)
  })
})
//Apply for a new leave
router.post('/apply-leave', (req, res) => {
  dbHelper.applyNewLeave(req.body).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//View applied leave status
router.get('/view-leave/:uid', (req, res) => {
  dbHelper.viewLeaves(req.params.uid).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
module.exports = router;
