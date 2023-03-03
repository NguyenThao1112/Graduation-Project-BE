
module.exports = Object.freeze({
    
    //Error codes
    SUCCESSFUL_CODE: 0,
    FAILED_CODE: 1,

    //Login's
    AUTH_LOGIN_FAILED_CODE: 1,
    AUTH_LOGIN_SUCCESS_MESSAGE: "Authenticate successfully",
    AUTH_LOGIN_FAILED_MESSAGE: "Authenticate failed",

    //Registration's
    AUTH_SIGNUP_FAILED_CODE: 1,
    AUTH_SIGNUP_SUCCESS_MESSAGE: "Registrate successfully",
    AUTH_SIGNUP_FAILED_MESSAGE: "Something went wrong on registration",

    //Forget password's
    AUTH_FORGET_PASSWORD_FAILED_CODE: 1,
    AUTH_FORGET_PASSWORD_SUCCESS_MESSAGE: "Please login to the email for reseting password",
    AUTH_FORGET_PASSWORD_FAILED_MESSAGE: "There is something wrong on forgot password feature",

    //Forget password token verify's
    AUTH_FORGET_PASSWORD_VERIFY_INVALID_CODE: 1,
    AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_CODE: 2,
    AUTH_FORGET_PASSWORD_VERIFY_SUCCESS_MESSAGE: "The token is valid",
    AUTH_FORGET_PASSWORD_VERIFY_INVALID_MESSAGE: "Invalid token",
    AUTH_FORGET_PASSWORD_VERIFY_EXPIRE_MESSAGE: "Expired token",


    //JWT's
    AUTH_JWT_SUCCESS_CODE: 0,
    AUTH_JWT_INVALID_TOKEN_CODE: 1,
    AUTH_JWT_UNAUTHORIZE_CODE: 2,
    AUTH_JWT_INVALID_TOKEN_MESSAGE: "Access denied! Invalid token",
    AUTH_JWT_UNAUTHORIZE_MESSAGE: "Access denied! Unauthorized",

    //Validator's
    VAL_IS_REQUIRED_MESSAGE: "is required",
    VAL_IS_BEING_USED_MESSAGE: "is being used",
    VAL_IS_NOT_EMAIL_MESSAGE: "must have email format",
    VAL_IS_NOT_MATCHED_MESSAGE: "do not match",
    VAL_IS_NOT_EXISTED: "is not existed",
})

