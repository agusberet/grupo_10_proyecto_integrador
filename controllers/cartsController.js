const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');

const cartsController = {
   mostrarCarrito: function(req, res, next) {
       res.render("productCart");
   },
   agregarProducto: function(req, res, next) {
       db.Carrito.findOne({
           where: {
                    usuario_id: req.cookies.usuarioID,
                    estado: 1,
                }
            })
    }

}

module.exports = cartsController;
