//TODO: Create function with paramas to send a email notification.
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'citagenda50@gmail.com', // generated ethereal user
    pass: 'pjkpcxsetiqnyflj', // generated ethereal password
  },
  logger: true
});


 const sendMail = (subject, message, to) => {

  let mailOptions = {
    from: 'citagenda50@gmail.com',
    to,
    subject,
    html: message
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return true
}

module.exports =  sendMail;