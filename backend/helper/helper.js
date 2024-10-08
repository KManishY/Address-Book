const nodemailer = require('nodemailer');

const sendEmail = async (otp,emailId, name)=>{
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: emailId,
            
            subject: 'Your Login One Time Password From Manish Kumar',
            text: `Hi, ${name}, use OTP ${otp} for login.`
          };
       const mailresponse = await transporter.sendMail(mailOptions);
       if(mailresponse.accepted.length>0){
        return {status: true}
       }else{
        return {status: false}
       } 
    } catch (error) {
        console.log(error);
        return {status: false}
    }
}
module.exports = {sendEmail};