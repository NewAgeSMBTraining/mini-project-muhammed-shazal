const mongoose=require('mongoose')
const adminSchema = new mongoose.Schema({
    id:String,
    role : {
        type : String,
        default : 'admin'
    },
    email:{ 
        type:String,
        unique:true
    },
    password: String,
    reset_token:String
})
const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel