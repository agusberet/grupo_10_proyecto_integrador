const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');
const sql = require('sequelize');

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
    let prodRel = db.Producto.findAll({
        order: sql.literal('rand()'),
        limit: 2,
        include: [{association:"imagenes"}]
    });
         Promise.all([carrito, nombre, prodRel])
        .then(function([carrito, nombre, prodRel]){
             res.render("productCart", {carrito:carrito, nombre:nombre, prodRel: prodRel});
             console.log(carrito)
         })
   },
   agregarProducto: function(req, res, next) {
       
    },
}

module.exports = cartsController;
