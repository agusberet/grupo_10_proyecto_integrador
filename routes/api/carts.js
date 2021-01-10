const express = require('express');
const router = express.Router();
const cartsController = require('../../controllers/api/cartsController');

router.get('/closed', cartsController.cerrado)

module.exports = router;