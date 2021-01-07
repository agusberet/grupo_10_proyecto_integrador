const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');

const cartsController = {
   mostrarCarrito: function(req, res, next) {
    let carrito = db.Carrito.findOne({
        where: {
                 usuario_id: req.cookies.usuarioID,
                 estado: 1,
             },
         include: [{ all: true, nested: true}]
        });
    let nombre = req.cookies.usuarioNombre;
         Promise.all([carrito, nombre])
        .then(function([carrito, nombre]){
             res.render("productCart", {carrito:carrito, nombre:nombre});
             console.log(carrito)
         })
   },
   agregarProducto: function(req, res, next) {
       
    },
}

module.exports = cartsController;
