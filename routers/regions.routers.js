const express = require('express');
const router = express.Router();
const regionsControllers = require('../controllers/regions.controllers');
const middlewares = require('../middleware/middlewares');

router.use(middlewares.tokenValidator, middlewares.adminIdentificator);
router.get('/', regionsControllers.getRegions);
router.put('/update/:id', regionsControllers.updateRegion);

module.exports = router;