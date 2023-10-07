const { USERS } = require('../middleware/database');
const  APIError = require('../utils/APIError');
const { generateHash, generateJsonToken } = require('../utils/helper');

exports.signIn = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const _where = { is_deleted: false, email: payload.email };
        const password = generateHash(payload.password);

        const hasUser = await USERS.findOne(
            { where: _where },
            { attributes: {
                exclude: ['password', 'deletedAt', 'is_deleted']
            }}
        );
        if (!hasUser) throw new APIError({ status: 400, message: `Please enter register email or password!!` });
        
        hasUser.dataValues.access_token = generateJsonToken({
            user_id: hasUser.id,
            email: hasUser.email
        });

        return res.sendJson(200, 'User sign-in successfully', hasUser)
    } catch (err) { next(err); }
}

exports.createUser = async (req, res, next) => {
    try {
       return res.sendJson(200, 'User added successfully')
    } catch (err) { next(err); }
}