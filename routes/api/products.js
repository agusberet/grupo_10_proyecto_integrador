var express = require('express');
const productsController = require('../../controllers/api/productsController');
var router = express.Router();

router.get('/', productsController.list)

router.get('/detalle/:id', productsController.find)

router.get('/total', productsController.findProductos)
router.get('/categorias', productsController.findCategorias)
router.get('/categorias/total', productsController.contarCategorias)

module.exports = router;