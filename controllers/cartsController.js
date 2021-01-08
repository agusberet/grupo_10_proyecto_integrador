const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');
const sql = require('sequelize');
const { promiseImpl } = require('ejs');

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
    
        db.Carrito.findOne({
            where: {
                 usuario_id: req.cookies.usuarioID,
                 estado: 1,
             }
            })
            .then(function(carrito) {
            if(!carrito) {
                db.Carrito.create({
                usuario_id: req.cookies.usuarioID,
                total: req.body.cantidad,
                cantidad: req.body.cantidad,
                fechaCreacion: Date.now(),
                fechaCompra: 1,
                estado: 1,
                })
            };
                db.Carrito_Producto.findOne({
                    where: {
                        carrito_id: carrito.id,
                        producto_id: req.body.id,
                    }
                })
                .then(function(carritoProducto) {
                    if(!carritoProducto) {
                        db.Carrito_Producto.create({
                            carrito_id: carrito.id,
                            producto_id: req.body.id,
                            cantidad: req.body.cantidad,
                            precioCongelado: 0,
                    });
                     } else {
                    db.Carrito_Producto.update({
                        cantidad: req.body.cantidad,
                        precioCongelado: 0,
                    }, {
                     where: {
                        carrito_id: carrito.id,
                        producto_id: req.body.id,
                        }})
                    };
                });
                    res.redirect("/products")
                });
    },
    eliminarProducto: (req, res, next) => {
            try {
            db.Carrito_Producto.destroy({ //para eliminar el producto de la base de datos
                where: {
                    carrito_id: req.params.cartId,
                    producto_id: req.params.id,
                }, 
                
            })
            .then(function () {
            res.redirect("/carts");
            })
        } catch (error) {
        console.log(error)
        }
        },
    }





module.exports = cartsController;
