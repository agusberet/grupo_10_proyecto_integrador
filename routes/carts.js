const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cartsController = require('../controllers/cartsController');
const cartMiddleware = require('../middlewares/cartMiddleware');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })
  

router.get("/", cartMiddleware, cartsController.mostrarCarrito);
router.post("/", cartsController.agregarProducto);

router.get("/borrar/:id/:cartId", cartsController.eliminarProducto);

router.get("/confirmar", cartsController.confirmarCompra)

module.exports = router;
