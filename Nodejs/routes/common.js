var express = require('express');
var router = express.Router();
var dbHelper=require('../Helpers/dbHelper')
router.post('/change-password', function(req, res, next) {
    dbHelper.changePassword(req.body).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(500)
    })
    console.log(req.body);
    res.send('respond with a resource');
  });
module.exports = router;
