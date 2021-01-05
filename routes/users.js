const express = require('express');
const router = express.Router();
const fs = require("fs");
const {check, validationResult, body} = require("express-validator");
const usersController = require('../controllers/usersController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');





router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//para mostrar el formulario, solo para invitados
router.get('/login', guestMiddleware, usersController.login); 

//procesa la informacion ingresada en el formulario
router.post('/login',[
  check("email").isEmail().withMessage("Email incorrecto"),
  check("password").not().isEmpty().withMessage("Contraseña incorrecta")
], usersController.processLogin);



//para mostrar el formulario de registro
router.get('/register', guestMiddleware, usersController.register); 

//para procesar y validar los  ingresados en el formulario de registro
router.post('/register',[ 
  check("nombre").isLength( {min:1, max:30} ).withMessage("El campo nombre no debe estar vacio "),
  check("apellido").isLength( {min:1, max:30} ).withMessage("Debe ingresar su Apellido"),
  check("email").isEmail().withMessage("Formato de email invalido"),
  check("password").not().isEmpty().withMessage("Contraseña inválida"),
  body("confirmPassword","password").custom(function (value, {req}){
    if (req.body.password == req.body.confirmPassword){
      return true;
    }else{ return false}
  }).withMessage("Las contraseñas no Coinciden")
],usersController.createUser);


router.get('/micuenta', usersController.micuenta);


//formulario para editar perfil del usuario
router.get('/editPerfil/:id', authMiddleware, usersController.editPerfil);

router.post('/editPerfil/:id', [
  check("nombre").isLength( {min:1, max:30} ).withMessage("Nombre inválido "),
  check("apellido").isLength( {min:1, max:30} ).withMessage("Apellido inválido ")
], authMiddleware, usersController.newPerfil);



//Formulario para editar contraseña
router.get('/editPassword/:id', authMiddleware, usersController.editPassword)

//Actualizar Contraseña en la base de 
router.post('/editPassword/:id', authMiddleware, usersController.updatePassword);

//Agregar administrador
router.get('/agregarAdmin',authMiddleware, adminMiddleware, usersController.agregarAdmin);

router.post('/agregarAdmin',[ 
  check("nombre").isLength( {min:1, max:30} ).withMessage("El campo nombre no debe estar vacio "),
  check("apellido").isLength( {min:1, max:30} ).withMessage("Debe ingresar su Apellido"),
  check("email").isEmail().withMessage("Formato de email invalido"),
  check("password").not().isEmpty().withMessage("Contraseña inválida"),
  body("confirmPassword","password").custom(function (value, {req}){
    if (req.body.password == req.body.confirmPassword){
      return true;
    }else{ return false}
  }).withMessage("Las contraseñas no Coinciden")
],usersController.processAdmin);

router.get('/prueba', authMiddleware, usersController.locals);



//cerrar sesión
router.get('/destroySession', usersController.destroySession);


module.exports = router;





