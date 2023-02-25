const {check} = require('express-validator');
const {isUsedEmail} = require('../services/authServices');
const messageConstants = require('../constants/messageConstants');

function registrationValidators() {
    return [
        check('email', `Email ${messageConstants.VAL_IS_REQUIRED_MESSAGE}`).not().isEmpty(),
        check('email', `Email ${messageConstants.VAL_IS_NOT_EMAIL_MESSAGE}`).isEmail(),
        check('email').custom((email) => {

            //Check if the email is used
            return isUsedEmail(email)
                .then((isUsed) => {
                    if (isUsed) {
                        return Promise.reject(`Email ${messageConstants.VAL_IS_BEING_USED_MESSAGE}`);
                    } 
                })

        }),

        check('password', `Password ${messageConstants.VAL_IS_REQUIRED_MESSAGE}`)
            .not().isEmpty()
            .custom((password, {req}) => {
                if (password !== req.body.password2) {
                    throw new Error(`Password ${messageConstants.VAL_IS_NOT_MATCHED_MESSAGE}`);
                }

                return true;
            }),
    ]
}

module.exports = {
    registrationValidators,
}