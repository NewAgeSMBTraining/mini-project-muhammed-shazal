var employeeSchema = require('../Models/employeeSchema')
var leavesSchema = require('../Models/leavesSchema')
var adminSchema = require('../Models/adminSchema')
var bcrypt = require('bcrypt')
var crypto = require('crypto')
//All Database related functions
module.exports = {
    registerAdmin: (details) => {
        console.log(details);
        return new Promise(async (resolve, reject) => {
            details.password = await bcrypt.hash(details.password, 10)
            await adminSchema.create(details).then((res) => {
                resolve();
            }).catch((err) => {
                reject(err)
            })
        })
    },
    addEmployee: (details) => {
        return new Promise(async (resolve, reject) => {
            details.password = await bcrypt.hash(details.password, 10)
            await employeeSchema.create(details).then((res) => {
                resolve();
            }).catch((err) => {
                reject(err)
            })
        })
    },
    listEmployees: () => {
        return new Promise((resolve, reject) => {
            employeeSchema.find().then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    listEmployee: (id) => {
        return new Promise((resolve, reject) => {
            employeeSchema.findById(id).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    editEmpDetails: (id, body) => {
        return new Promise((resolve, reject) => {
            employeeSchema.findByIdAndUpdate(id, body).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }, editDetails: (id, body) => {
        return new Promise((resolve, reject) => {
            employeeSchema.findByIdAndUpdate(id, body).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            employeeSchema.findById(id).then((user) => {
                if (user) {
                    user.remove().then((data) => {
                        resolve(data)
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    },
    applyNewLeave: (data) => {
        return new Promise((reject, resolve) => {
            leavesSchema.create(data).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    viewAllLeaves: () => {
        return new Promise((resolve, reject) => {
            leavesSchema.find().then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    viewLeaves: (uid) => {
        return new Promise((resolve, reject) => {
            leavesSchema.find({ uid: uid }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    blockOrUnblockUser: (id) => {
        return new Promise(async (resolve, reject) => {
            let user = await employeeSchema.findById(id)
            employeeSchema.findByIdAndUpdate(id, {
                block: !user.block
            }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    approveLeave: (id) => {
        return new Promise((resolve, reject) => {
            leavesSchema.findByIdAndUpdate(id, {
                status: "Approved"
            }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    rejectLeave: (id) => {
        return new Promise((resolve, reject) => {
            leavesSchema.findByIdAndUpdate(id, {
                status: "Rejected"
            }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    changePassword: (data) => {
        return new Promise(async (resolve, reject) => {
            if (data.role == 'admin') {
                let admin = await adminSchema.findById(data._id)
                bcrypt.compare(data.old_password, admin.password).then(async (result) => {
                    if(result){
                        let pwd = await bcrypt.hash(data.new_password, 10)
                        adminSchema.findByIdAndUpdate(data._id, {
                            password: pwd
                        }).then((res) => {
                            resolve(res)
                        }).catch((err) => {
                            reject(err)
                        })
                    }
                    else{
                        reject({msg:"Invalid old password"})
                    }
                }).catch((err) => {
                    reject(err)
                })
            }
            else if (data.role == 'employee') {
                console.log('emp p');
                let user = await employeeSchema.findById(data._id)
                console.log(data.old_password);
                console.log(user.password);
                bcrypt.compare(data.old_password, user.password).then(async (result) => {
                    if(result){
                        let pwd = await bcrypt.hash(data.new_password, 10)
                        employeeSchema.findByIdAndUpdate(data._id, {
                            password: pwd
                        }).then((res) => {
                            resolve(res)
                        }).catch((err) => {
                            reject(err)
                        })
                    }
                    else{
                        reject({msg:"Invalid old password"})
                    }
                }).catch((err) => {
                    reject(err)
                })
            } else {

            }
        })
    },
    forgotPassword: (emaildata) => {
        return new Promise(async (resolve, reject) => {
            let admin = await adminSchema.findOne({ email: emaildata })
            if (admin) {
                reset_token = crypto.randomBytes(20).toString('hex');
                admin.reset_token = reset_token;
                let reset_url = `http://localhost:3000/password/reset/${reset_token}`
                await admin.save();
                resolve({ admin, reset_url })
            }
            reject('Invalid Email')
        })
    },
    resetPassword: (data, token) => {
        return new Promise(async (resolve, reject) => {
            if (data.password !== data.confirm_password) { reject({ msg: "Please enter same passsword" }) }
            else {
                let admin = await adminSchema.findOne({ reset_token: token })
                let password = await bcrypt.hash(data.password, 10)
                admin.password = password;
                await admin.save();
                resolve({ msg: "Password changed succesfully" })
            }
        })
    }
}