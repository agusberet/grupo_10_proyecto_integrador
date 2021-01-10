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
    let carritoProducto = Promise.all([carrito]).then(function(carro) {
        db.Carrito_Producto.findAll({
            where: {
                carrito_id: carro.id
            }
        })
   }); 
    let prodRel = db.Producto.findAll({
        order: sql.literal('rand()'),
        limit: 2,
        include: [{association:"imagenes"}]
    });
    let total = Promise.all([carrito]).then(function(carrito){ db.Carrito_Producto.count({
        where: {
            cantidad: true,
            carrito_id: carrito.id,
        }
    })
});
    let precioTotal = 
    Promise.all([carritoProducto])
            .then(function(carritoProducto){
            db.Producto.count({
                where: {
                    id: carritoProducto.producto_id,
                    precio: true,
                }
            })
        }); 
    
   
    
         Promise.all([carrito, nombre, prodRel, total, carritoProducto, precioTotal])
        .then(function([carrito, nombre, prodRel, total, carritoProducto, precioTotal]){
            
             res.render("productCart", {carrito, nombre, prodRel, total});
             console.log(carrito); 
             
         })
         
   },
   agregarProducto: function(req, res, next) {
    
       let crearCarrito =  db.Carrito.findOne({
            where: {
                 usuario_id: req.cookies.usuarioID,
                 estado: 1,
             }
            })
            .then(function(carrito) {
            if(!carrito) {
                db.Carrito.create({
                usuario_id: req.cookies.usuarioID,
                total: 0,
                cantidad: 0,
                fechaCreacion: Date.now(),
                fechaCompra: 1,
                estado: 1,
                }) }});
                crearCarrito.then(() => { 
                db.Carrito.findOne({
                    where: {
                         usuario_id: req.cookies.usuarioID,
                         estado: 1,
                     }
                    }).then(function(carrito) {
                    if(carrito) {
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
                }) .then(function() {
                    res.redirect("/products")
                })
                    }
                }
            )
                })
        
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
    cambiarCantidad: (req, res, next) => {

    },
    confirmarCompra: (req, res, next) => {
        db.Carrito.update({
            
                estado: 0,
                }, {
            where: {
                usuario_id: req.cookies.usuarioID,
                estado: 1
            }, 
        }
        ). then(function(){
            res.redirect("/products");
        }) 
    }
    }





module.exports = cartsController;
