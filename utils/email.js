const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth:{
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})


module.exports = async(options) => {

  await transporter.sendMail({
    from: 'Najib E-commerce Api',
    to: options.email,
    subject: options.subject,
    text: options.text
  })
  
}
