const mongoose=require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new mongoose.Schema({
    id:String,
    role : {
        type : String,
        default : 'employee'
    },
    name:String,
    email:{ 
        type:String,
        unique:true
    },
    password: String,
    dob:String,
    gender:String,
    contact:Number,
    address:String,
    education:String,
    experience:String,
    block:{
        type:Boolean,
        default:false
    }
})
employeeSchema.plugin(uniqueValidator);
const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel