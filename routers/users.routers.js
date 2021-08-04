const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const middlewares = require("../middleware/middlewares");

router.post('/signUp', middlewares.emailValidator, usersControllers.singupUser);

router.use(middlewares.tokenValidator);


router.use(middlewares.adminIdentificator);
router.post('/signinBasic', middlewares.emailValidator, middlewares.passwordEncrypt, usersControllers.singinUserBasic);
router.post('/signinAdmin', middlewares.emailValidator, middlewares.passwordEncrypt, usersControllers.singinUserAdmin);

module.exports = router;