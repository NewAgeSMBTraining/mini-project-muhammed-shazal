//Leaves Schema
const mongoose=require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const leavesSchema = new mongoose.Schema({
    id:String,
    uid:String,
    applied_date:{
        type:Date,
        default:new Date().toLocaleString('en-US')
    },
    email:String,
    from_leave_date:String,
    to_leave_date:String,
    reason:String,
    status:{
        type:String,
        default:"Pending"
    }
})
const leavesModel = mongoose.model('leaves', leavesSchema);
module.exports = leavesModel