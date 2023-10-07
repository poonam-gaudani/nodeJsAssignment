const router = require('express').Router();
// const { validate } = require('express-validation');
const { validate } = require('express-validation');


const { signIn } = require("../validations/users");
const USER_CONTROLLER = require("../controllers/users");
const { isAuth } = require('../middleware/authentication');
const { USER_TYPE } = require('../utils/enums');

router.post('/sign_in', validate(signIn), USER_CONTROLLER.signIn);
router.post('/create_user', isAuth([USER_TYPE.ADMIN, USER_TYPE.SUPERADMIN]),  USER_CONTROLLER.createUser);

module.exports = router;