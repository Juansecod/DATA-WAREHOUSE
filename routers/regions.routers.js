const express = require('express');
const router = express.Router();
const regionsControllers = require('../controllers/regions.controllers');
const middlewares = require('../middleware/middlewares');

router.use(middlewares.tokenValidator, middlewares.adminIdentificator);
// Regiones
router.get('/', regionsControllers.getRegions);
router.post('/register', regionsControllers.postRegion);
router.put('/update/:idRegion', regionsControllers.updateRegion);
router.delete('/delete', regionsControllers.deleteRegion);

// Paises
router.get('/countries', regionsControllers.getCountries);
router.get('/:idRegion/countries', regionsControllers.getCountriesOfRegion);
router.post('/:idRegion/countries/register', regionsControllers.postCountriesOfRegion);
router.put('/:idRegion/countries/update/:idCountry', regionsControllers.updateCountry);
router.delete('/:idRegion/countries/delete', regionsControllers.deleteCountry);

// Ciudades
router.get('/cities', regionsControllers.getCities);
router.get('/countries/:idCountry/cities', regionsControllers.getCitiesesOfCountry);

module.exports = router;