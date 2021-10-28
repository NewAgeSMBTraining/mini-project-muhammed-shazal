var express = require('express');
var router = express.Router();
var dbHelper=require('../Helpers/dbHelper')
var employeeSchema=require('../Models/employeeSchema');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
// Passport
passport.use(new LocalStrategy(  
  async function (username, password, done) {
    let user = await employeeSchema.findOne({email:username})
    if (user) {
      if(user.block==true){
        done(null,false,{message:"User is blocked"})
        return;
      }
      bcrypt.compare(password, user.password).then((data) => {
        if (data) {
          console.log("Login Success");
          done(null,user, {user:data});
          return;
        }
        else {
          console.log("Login Failed");
          done(null, false,{message:'Invalid login'})
          return;
        }
      })
      }  
      else{
        done(null, false,{message:'Invalid login'})
        return;
      }
    }
));
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',passport.authenticate('local', { session: false }),(req, res, next)=> {
  var token = jwt.sign({ id: req.user._id }, 'secret');
  res.send({msg:"Login Success",user:req.user,token:token});
})
router.post('/apply-leave',(req,res)=>{
      dbHelper.applyNewLeave(req.body).then((data)=>{
        res.send(data)
      }).catch((err)=>{
        res.send(err)
      })
})
router.get('/view-leave/:uid',(req,res)=>{
      dbHelper.viewLeaves(req.params.uid).then((data)=>{
        res.send(data)
      }).catch((err)=>{
        res.send(err)
      })
})
router.post('/edit-details/:id',(req,res)=>{ 
  dbHelper.editDetails(req.params.id,req.body).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.status(400).json(err)
  })
})
router.get('/list-employee/:id',(req,res)=>{
  dbHelper.listEmployee(req.params.id).then((data)=>{
    console.log(data);
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})



module.exports = router;
