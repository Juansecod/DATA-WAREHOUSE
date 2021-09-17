/* Dependencias */
const express = require('express');
const router = express.Router();

/* Controladores */
const companiesControllers = require('../controllers/companies.controllers');

/* Middlewares */
const middlewares = require('../middleware/middlewares');

/* Valida sesion activa */
router.use(middlewares.tokenValidator);

/* Rutas */
router.get('/', companiesControllers.getCompanies);
router.post('/register', middlewares.emailValidator,companiesControllers.postCompany);
router.put('/update/:id', companiesControllers.updateCompany);
router.delete('/delete', companiesControllers.deleteCompany);

module.exports = router;