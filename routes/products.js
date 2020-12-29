var express = require('express');
const productController = require('../controllers/productsController');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })

//RUTAS 

router.get('/', productController.listadb); // muestra la lista de productos desde la base de datos.

router.get('/categorias/:id', productController.filtrardb); // muestra la lista de productos desde la base de datos.


router.get('/ofertas', productController.ofertas);

router.get('/listado', authMiddleware, adminMiddleware,  productController.listadoTabla) //para que el administrador pueda ver editar y borrar una lista de productos

router.get('/detail/:id', productController.detail);

router.get('/add', authMiddleware, adminMiddleware, productController.productAdd); //para mostrar el formulario
router.post('/add', upload.any(), productController.processAdd); //procesa el formulario

router.get('/edit/:id',authMiddleware, adminMiddleware, productController.editarProducto); //muestra el formulario de edicion
router.post('/edit/:id', upload.any(), productController.actualizarProducto);//procesa y actualiza la informacion sobre el producto

router.get("/borrar/:id",authMiddleware, adminMiddleware, productController.borrar);

router.get('/cart', productController.cart);


module.exports= router;