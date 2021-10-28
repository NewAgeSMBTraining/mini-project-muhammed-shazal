var express = require('express');
var router = express.Router();
var dbHelper = require('../Helpers/dbHelper')
//Common change password API
router.post('/change-password', function (req, res, next) {
    dbHelper.changePassword(req.body).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).json(err)
    })
});
module.exports = router;
