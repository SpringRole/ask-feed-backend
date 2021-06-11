const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "santanrathore75209@gmail.com",
    pass: "*Saheb13*",
  },
});

module.exports ={
    transporter
}