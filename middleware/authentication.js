const APIError = require('../utils/APIError');
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config");
const { USERS } = require('./database');

/**
 * Authentication for given roles
 * @param {*} roles Roles required for checking process
 */
exports.isAuth = (roles) => async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader)  throw new APIError({ status: 401, message: `Invalid or Missing header.` });

    // The authHeader should be in the format "Bearer token_value"
    const token = authHeader.split(' ')[1]; // Extract the token part

    const hasTokenValid = jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) return false;
      else return decoded;
    });
    if (!hasTokenValid) throw new APIError({ status: 401, message: `Invalid Token.` });
    
    const user = await USERS.findOne({ where: { id: hasTokenValid.user_id, is_deleted: false }})
    if (!user) throw new APIError({ status: 404, message: `No records were found by given id` });
    req.user = user;
    
    if (!roles) { return next(); }
    else {
      roles = typeof roles === "string" ? [roles] : roles || [];
      if (roles.includes(user.role)) return next();
      else throw new APIError({ status: 401, message: `You are not authorized to access.` });
    }
  }
  catch (err) { next(err); }
}
