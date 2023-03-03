const nodemailer = require("nodemailer");

/**
 * 
 * @param {string} provider 
 * @param {string} username 
 * @param {string} password
 * @return {nodemailer.Transporter<SMTPTransport.SentMessageInfo>} transporter 
 */
function buildSender(provider, username, password) {
    const transporter = nodemailer.createTransport({
        service: provider,
        auth: {
          user: username,
          pass: password,
        }
    });

    return transporter;
}

/**
 * 
 * @param {nodemailer.Transporter<SMTPTransport.SentMessageInfo>} sender 
 * @param {Object} mailOptions 
 * @param {callback} errorHandle
 * @return {void} 
 */
function sendMail(sender, mailOptions, errorHandle) {
    sender.sendMail(mailOptions, errorHandle);
}

module.exports = {
    buildSender,
    sendMail,
}
  
// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
//     console.log(error);
// } else {
//     console.log('Email sent: ' + info.response);
// }
// }); 