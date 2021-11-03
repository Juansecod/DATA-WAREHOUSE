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

/* Acceso solo admin */
router.use(middlewares.tokenValidator, middlewares.adminIdentificator);

    // Regiones
router.get('/', regionsControllers.getRegions);
router.post('/register', regionsControllers.postRegion);
router.put('/update/:idRegion', regionsControllers.updateRegion);
router.delete('/delete', regionsControllers.deleteRegion);

    // Paises
router.get('/countries', countriesControllers.getCountries);
router.get('/:idRegion/countries', countriesControllers.getCountriesOfRegion);
router.post('/:idRegion/countries/register', countriesControllers.postCountriesOfRegion);
router.put('/countries/update/:idCountry', countriesControllers.updateCountry);
router.delete('/countries/delete', countriesControllers.deleteCountry);

    // Ciudades
router.get('/cities', citiesControllers.getCities);
router.get('/countries/:idCountry/cities', citiesControllers.getCitiesesOfCountry);
router.post('/countries/:idCountry/cities/register', citiesControllers.postCitiesOfCountry);
router.put('/cities/update/:idCity', citiesControllers.updateCity);
router.delete('/cities/delete', citiesControllers.deleteCity);

module.exports = router;
