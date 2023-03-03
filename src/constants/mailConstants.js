require('dotenv').config();

module.exports = Object.freeze({
    
    //SMTP configs
    MAIL_PROVIDER: process.env.MAIL_PROVIDER,
    MAIL_SECURE: process.env.MAIL_SECURE,
    MAIL_PORT: process.env.MAIL_PORT,

    //Email accounts
    MAIL_SUPPORT_USERNAME: process.env.MAIL_SUPPORT_USERNAME,
    MAIL_SUPPORT_PASSWORD: process.env.MAIL_SUPPORT_PASSWORD,
});