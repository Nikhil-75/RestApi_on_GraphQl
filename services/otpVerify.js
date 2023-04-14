const nodemailer = require("nodemailer");
const { Email_PASSWORD } = require("../config");

function otpEmail(otp, email) {
  console.log(`Otp ${otp} is sent to email: ${email}`)

  //console.log(`otp ${otp} is sent to email: ${email}`)

  // const transporter = nodemailer.createTransport({
  //   service: "outlook",
  //   auth: {
  //     user: "ABC07dear@outlook.com",
  //     pass: Email_PASSWORD,
  //   },
  //    
  // }); 

  // const mailOptions = {
  //   from: '"otp to reset password" <nikhil07dear@outlook.com>',
  //   to:"ABC13@gmail.com",
  //   subject: "otp to reset password",
  //   text: "please check your mail to verify code "  ,
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("verification email has been send");
  //   }
  // });
} 

module.exports = { otpEmail };









