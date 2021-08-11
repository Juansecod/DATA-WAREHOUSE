const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const middlewares = require("../middleware/middlewares");

router.post('/signUp', middlewares.emailValidator, usersControllers.singupUser);

router.use(middlewares.tokenValidator);

router.use(middlewares.adminIdentificator);
router.get('/', usersControllers.getUSers);
router.get('/:id', usersControllers.getUSer);
router.put('/update/:id', usersControllers.updateUser);
router.put('/updateRol/:idUsuario', usersControllers.updateRolUser);
router.post('/signinUser', middlewares.emailValidator, middlewares.passwordEncrypt, usersControllers.singinUser);
router.delete('/delete', usersControllers.deleteUser);

module.exports = router;