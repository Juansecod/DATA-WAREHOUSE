/* Dependencias */
const express = require('express');
const router = express.Router();

/* Controladores */
const regionsControllers = require('../controllers/regions.controllers');
const countriesControllers = require('../controllers/countries.controllers');
const citiesControllers = require('../controllers/cities.controllers');

/* Middlewares */
const middlewares = require('../middleware/middlewares');

/* Rutas */
router.get('/list', regionsControllers.getListRegions);
router.get('/', regionsControllers.getRegions);
router.get('/countries', countriesControllers.getCountries);
router.get('/:idRegion/countries', countriesControllers.getCountriesOfRegion);
router.get('/cities', citiesControllers.getCities);
router.get('/countries/:idCountry/cities', citiesControllers.getCitiesesOfCountry);

/* Acceso solo admin */
router.use(middlewares.tokenValidator, middlewares.adminIdentificator);

    // Regiones Admin
router.post('/register', regionsControllers.postRegion);
router.put('/update/:idRegion', regionsControllers.updateRegion);
router.delete('/delete', regionsControllers.deleteRegion);

    // Paises Admin
router.post('/:idRegion/countries/register', countriesControllers.postCountriesOfRegion);
router.put('/countries/update/:idCountry', countriesControllers.updateCountry);
router.delete('/countries/delete', countriesControllers.deleteCountry);

    // Ciudades Admin
router.post('/countries/:idCountry/cities/register', citiesControllers.postCitiesOfCountry);
router.put('/cities/update/:idCity', citiesControllers.updateCity);
router.delete('/cities/delete', citiesControllers.deleteCity);

module.exports = router;
