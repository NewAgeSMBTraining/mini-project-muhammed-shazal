var express = require('express');
var router = express.Router();
var adminSchema=require('../Models/adminSchema');
var bcrypt=require('bcrypt')
var dbHelper=require('../Helpers/dbHelper')
var mailer=require('../Config/mailer')
var jwt = require('jsonwebtoken');
const { db } = require('../Models/adminSchema');
const auth=async(req,res,next)=>{
  let admin = await adminSchema.findOne({email:req.body.username});
  if (admin) {
    bcrypt.compare(req.body.password, admin.password).then((data) => {
      if (data) {
        req.admin=admin
        next()
      }
      else {
        res.status(500).json({message:'Invalid password'})
      }
    })
  }
  else{
    res.status(500).send("Invalid User")
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//Admin Signup
router.post('/register-admin',(req, res, next)=> {
  dbHelper.registerAdmin(req.body).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})
//Login Authenticaton
router.post('/login',auth,(req, res, next)=> {
  var token = jwt.sign({ id: req.admin._id }, 'secret');
  res.send({msg:"Login Success",token:token});
})
router.post('/add-employee',async (req,res)=>{
    console.log(req.body);
    dbHelper.addEmployee(req.body).then((data)=>{
      res.send("Employee Added")
    }).catch((err)=>{
      res.status(400).json(err)
    })
})
router.get('/list-employees',(req,res)=>{
  dbHelper.listEmployees().then((data)=>{
    res.send(data)
  })
})
router.get('/list-employee/:id',(req,res)=>{
  dbHelper.listEmployee(req.params.id).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})
router.post('/edit-employee/:id',(req,res)=>{  
    dbHelper.editEmpDetails(req.params.id,req.body).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.status(400).json(err)
    })
})
router.delete('/delete-employee/:id',(req,res)=>{
    dbHelper.deleteUser(req.params.id).then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })
})
router.get('/view-all-leaves',(req,res)=>{
    dbHelper.viewAllLeaves().then((data)=>{
      res.send(data)
    }).catch((err)=>{
      res.send(err)
    })
})
router.post('/block-or-unblock-user/:id',(req,res)=>{
  dbHelper.blockOrUnblockUser(req.params.id).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})
router.post('/approve-leave/:id',(req,res)=>{
  dbHelper.approveLeave(req.params.id).then((data)=>{
    res.send("Success")
  }).catch((err)=>{
    res.send(err)
  })
})
router.post('/reject-leave/:id',(req,res)=>{
  dbHelper.rejectLeave(req.params.id).then((data)=>{
    res.send("Success")
  }).catch((err)=>{
    res.send(err)
  })
})
router.post('/forgot-password',async (req,res)=>{
  dbHelper.forgotPassword(req.body.email).then(async(data)=>{
    const message=`<p>Click <a href=${data.reset_url}>here</a> to reset your password</p>`
    // const message =`Your password Reset Token is as follows: ${data.reset_url}`
// Sending EMail to user 
  await mailer.sendMail({
      email : data.admin.email,
      subject : 'EMS Password Recovery Email',
      message
  })
  res.status(200).json({
      success : true,
      message : 'Password Recovery Email sent. Please check the Email'
  })
  }).catch((err)=>{
    console.log(err);
    res.status(500).json(err)
  })
})
router.post('/reset-password/:token',(req,res)=>{
  console.log(req.body);
  console.log(req.params.token);
  dbHelper.resetPassword(req.body,req.params.token).then((data)=>{

  }).catch((err)=>{

  })
})
module.exports = router;
