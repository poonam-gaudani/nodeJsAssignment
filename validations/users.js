const { Joi } = require('express-validation');

const { errorMessage } = require('../utils/helper');
const { USER_TYPE } = require('../utils/enums');

exports.signIn = {
    body: Joi.object({
        email: Joi.string().email().required().messages(errorMessage('Email')),
        password: Joi.string().trim().min(8).max(30).regex(/^[a-zA-Z0-9\s_@]+$/).required().messages(errorMessage('Password')),
        user_type: Joi.string().trim().required().valid(...Object.values(USER_TYPE)).messages(errorMessage('User type')),
    }).not({}).options({ abortEarly: false })
}