const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');

const cartsController = {
    mostrarCarrito: function(req,res,next){//para mostrar el carrito del usuario con los productos        
        db.Carrito.findOne({
            where: {
                usuario_id: req.params.usuario_id,
                estado: 1
            }
        })
        .then(function(carrito){
            if(!carrito){
                db.Carrito.create({
                    usuario_id: req.params.usuario_id,
                    fecha_creacion: new Date(),
                    estado: 1
                })
                .then(function(){
                    let carrito_producto = []
                    res.render('carts/productCart', {carrito_producto})
                })
            } else {
                db.carrito_producto.findAll({
                    where: {
                        carrito_id: carrito.id
                    },
                    include: [{association: 'productos'}, {association: 'imagenes'}]
                })
                .then(function(carrito_producto){
                    res.render("productCart", {carrito_producto})
                })
            }
        })
    },
    agregarProducto: function(req,res,next){
        let id_usuarioLogueado = req.session.usuarioLogueado.id;
        db.Producto.findByPk(req.params.id)
        .then(function(producto){
            /*if(producto.stock >= req.body.cantidad)*/{
                db.Carrito.findOne({
                    where: {
                        usuario_id: id_usuarioLogueado,
                        estado: 1
                    }
                })
                .then(function(carrito){
                    if(!carrito){
                        db.Carrito.create({
                            usuario_id: id_usuarioLogueado,
                            fecha_creacion: new Date(),
                            estado: 1
                        })
                        .then(function(carrito){
                            db.Carrito_Producto.create({
                                carrito_id: carrito.null,
                                producto_id: req.params.producto_id,
                                cantidad: req.body.cantidad
                            })
                            .then(function(){
                                let producto_id = req.params.producto_id 
                                res.redirect("/products/detail/"+producto_id)
                            })
                        })
                    } else {
                        db.Carrito_Producto.create({
                            carrito_id: carrito.id,
                            producto_id: req.params.producto_id,
                            cantidad: req.body.cantidad
                        })
                        .then(function(){
                            let producto_id = req.params.producto_id 
                            res.redirect("/products/detail/"+producto_id)
                        })
                    }
                })
            }
        })

    },
    eliminarProducto: function(req,res,next){
        db.carrito_producto.destroy({
            where: {
                carrito_id: req.params.carrito_id,
                producto_id: req.params.producto_id
            }
        })
        .then(function(){
            db.Carrito.findByPk(req.params.carrito_id)
            .then(function(carrito){
                res.redirect("/carts/"+carrito.usuario_id)
            })
        })
    },
    confirmarCompra: function(req,res,next){
        db.Carrito.update({
            estado: 0,
            fecha_compra: new Date()
        }, {
            where: {
                id: req.params.carrito_id
            }
        })
        .then(function(){
            for(let i=0 ; i < req.body.precio.length ; i++){
                db.carrito_producto.update({
                    precio_congelado: req.body.precio[i]
                }, {
                    where: {
                        id: req.body.id[i]
                    }
                })
                .then(function(){})
            }
            res.redirect('/')
        })
    }
}

module.exports = cartsController;