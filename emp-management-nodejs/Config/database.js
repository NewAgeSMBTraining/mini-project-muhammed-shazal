//Database configuration
const mongoose=require('mongoose')
const connectMongoose = () => {
    mongoose.connect('mongodb://localhost:27017/EmployeeManagement', {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }).then(res => {
        console.log('Connected to MongoDB Database');
    })
};
module.exports.connectdb = connectMongoose;
