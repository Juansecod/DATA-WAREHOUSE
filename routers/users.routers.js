const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const middlewares = require("../middleware/middlewares");

router.post('/signinBasic', middlewares.emailValidator, middlewares.passwordEncrypt, usersControllers.singinUserBasic);

module.exports = router;