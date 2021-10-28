//Nodemailer configuration
const nodemailer = require('nodemailer');
module.exports={
   sendMail:async (details)=>{
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2d083fb6470bb8",
          pass: "c034d13d07d340"
        }
      });

    const message = {
        from : "noReplay@EMS Application" ,
        to : details.email,
        subject : details.subject,
        html : details.message
    };

    //send Email
    await transport.sendMail(message);
    return;
}
}
