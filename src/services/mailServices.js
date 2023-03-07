const mailHelper = require('../helpers/mailHelper');
const mailConstants = require('../constants/mailConstants');
const configConstants = require('../constants/configConstants');
const urlConstants = require('../constants/urlConstants');

const senderPool = [
  mailHelper.buildSender(
    mailConstants.MAIL_PROVIDER,
    mailConstants.MAIL_SUPPORT_USERNAME,
    mailConstants.MAIL_SUPPORT_PASSWORD
  ),
];

const MAIL_SUPPORT_INDEX = 0;
const FORGET_PASSWORD_SUBJECT =
  '[FORGET PASSWORD] Your password just has been reset';

function sendMailErrorHandle(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
}

/**
 *
 * @param {string} userEmail
 * @param {string} token
 * @return {void}
 */
function sendTokenToUserMail(userEmail, token) {
  return new Promise((resolve, reject) => {
    //Create the metadata for the email
    const sender = senderPool[MAIL_SUPPORT_INDEX];
    const senderEmail = mailConstants.MAIL_SUPPORT_USERNAME;
    const emailSubject = FORGET_PASSWORD_SUBJECT;
    const host = configConstants.APP_HOST;
    const port = configConstants.APP_PORT;
    const ssl = 443 === port ? 's' : '';

    const rootApiUrl = urlConstants.ROOT_API_URL;
    const authApiUrl = urlConstants.AUTH_PREFIX_API_URL;
    const forgetPasswordApiUrl = urlConstants.AUTH_FORGET_PASSWORD_API_URL;
    const apiUrl = `${rootApiUrl}${authApiUrl}${forgetPasswordApiUrl}`;
    const tokenParam = `${urlConstants.AUTH_FORGET_PASSWORD_TOKEN_PARAM}`;

    const emailHtml = [
      `<span class="str">You requested for reset password, kindly use this </span>`,
      `<a href="http${ssl}://${host}:${port}${apiUrl}?${tokenParam}=${token}"><span class="str">link</span></a>`,
      `<span class="str"> to reset your password</span>`,
    ].join(' ');

    //Building metadata
    const mailOptions = {
      from: senderEmail,
      to: userEmail,
      subject: emailSubject,
      html: emailHtml,
    };

    //Send the email with the created sender and above metadata
    mailHelper.sendMail(sender, mailOptions, sendMailErrorHandle);
  });
}

module.exports = {
  sendTokenToUserMail,
};
