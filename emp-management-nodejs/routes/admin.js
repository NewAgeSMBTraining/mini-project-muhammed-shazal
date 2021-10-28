var express = require('express');
var router = express.Router();
var adminSchema = require('../Models/adminSchema');
var bcrypt = require('bcrypt')
var dbHelper = require('../Helpers/dbHelper')
var mailer = require('../Config/mailer')
var jwt = require('jsonwebtoken');
//Admin Login authentication
const auth = async (req, res, next) => {
  let admin = await adminSchema.findOne({ email: req.body.username });
  if (admin) {
    bcrypt.compare(req.body.password, admin.password).then((data) => {
      if (data) {
        req.admin = admin
        next()
      }
      else {
        res.status(500).json({ message: 'Invalid password' })
      }
    })
  }
  else {
    res.status(500).send("Invalid User")
  }
}
//Admin Signup
router.post('/register-admin', (req, res, next) => {
  dbHelper.registerAdmin(req.body).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//Login & Authenticaton
router.post('/login', auth, (req, res, next) => {
  var token = jwt.sign({ id: req.admin._id }, 'secret');
  res.send({ msg: "Login Success", token: token });
})
//Adding new employee
router.post('/add-employee', async (req, res) => {
  dbHelper.addEmployee(req.body).then((data) => {
    res.send("Employee Added")
  }).catch((err) => {
    res.status(400).json(err)
  })
})
//Listing all employees
router.get('/list-employees', (req, res) => {
  dbHelper.listEmployees().then((data) => {
    res.send(data)
  })
})
//Listing single employee details
router.get('/list-employee/:id', (req, res) => {
  dbHelper.listEmployee(req.params.id).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//Editing single employee details
router.post('/edit-employee/:id', (req, res) => {
  dbHelper.editEmpDetails(req.params.id, req.body).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.status(400).json(err)
  })
})
//Deleting an employee
router.delete('/delete-employee/:id', (req, res) => {
  dbHelper.deleteUser(req.params.id).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//View all leaves
router.get('/view-all-leaves', (req, res) => {
  dbHelper.viewAllLeaves().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//Block or unblock a user
router.post('/block-or-unblock-user/:id', (req, res) => {
  dbHelper.blockOrUnblockUser(req.params.id).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
//Approve a leave
router.post('/approve-leave/:id', (req, res) => {
  dbHelper.approveLeave(req.params.id).then((data) => {
    res.send("Success")
  }).catch((err) => {
    res.send(err)
  })
})
//Reject a leave
router.post('/reject-leave/:id', (req, res) => {
  dbHelper.rejectLeave(req.params.id).then((data) => {
    res.send("Success")
  }).catch((err) => {
    res.send(err)
  })
})
//Forget password & sending reset link
router.post('/forgot-password', async (req, res) => {
  dbHelper.forgotPassword(req.body.email).then(async (data) => {
    const message = `<p>Click <a href=${data.reset_url}>here</a> to reset your password</p>`
    await mailer.sendMail({
      email: data.admin.email,
      subject: 'EMS Password Recovery Email',
      message
    })
    res.status(200).json({
      success: true,
      message: 'Password Recovery Email sent. Please check the Email'
    })
  }).catch((err) => {
    res.status(500).json(err)
  })
})
//Resetting password
router.post('/reset-password/:token', (req, res) => {
  dbHelper.resetPassword(req.body, req.params.token).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send(err)
  })
})
module.exports = router;
