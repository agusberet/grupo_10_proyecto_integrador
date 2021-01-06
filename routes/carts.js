const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const cartMiddleware = require('../middlewares/cartMiddleware');

router.get("/", cartMiddleware, cartsController.mostrarCarrito);
router.post("/", cartsController.agregarProducto);

module.exports = router;
