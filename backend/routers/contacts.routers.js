/* Dependencias */
const express = require('express');
const router = express.Router();

/* Controladores */
const contactsControllers = require('../controllers/contacts.controllers');

/* Middlewares */
const middlewares = require('../middleware/middlewares');

/* Rutas */
router.use(middlewares.tokenValidator);
router.get('/', contactsControllers.getContacts);
router.post('/register', contactsControllers.postContact);
router.post('/addNetworks/:id', contactsControllers.addRedContact);
router.put('/update/:id', contactsControllers.putContact);
router.delete('/delete', contactsControllers.deleteContact);

module.exports = router;
