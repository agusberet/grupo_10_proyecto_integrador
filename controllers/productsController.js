
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');
let bcrypt= require('bcrypt');
let {check, validationResult, body} =require('express-validator');

const productController={

    listadb: function(req,res){
        try {
            db.Producto.findAll(
                {
                    include: ['categorias','subcategorias', 'imagenesProducto']
                }
            )
                .then(function (productos) {
                    res.render('products', {productos:productos});
                });
        } catch (error) {
            console.log(error)
        }
    },    

    productDetail: function(req, res) { //sirve de ejemplo
        res.render('productDetail');
    },

    prodDetail: function(req,res){
        db.Producto.findByPk(req.params.id, { //capturo el id de la url
            include:  [{association:"categorias"}, {association: "subcategorias"}, {association: "imagenesProducto"}]//en modelo Peliculas, usamos el nombre de la asociacion (as)
        }) 
            .then(function(producto){
                res.render("productDetail", {producto:producto})
            })
    }, 

    productAdd: function(req, res) { 
        res.render('productAdd');

    },

    processAdd: function(req,res){ 
    console.log(req.body);
        
        db.Producto.create({
            nombre:req.body.nombre,
            categoria_id:req.body.categoria,
            marca:req.body.marca,   
            talle_id:req.body.talle,
            color_id:req.body.color,
            stock:req.body.stock,
            precio:req.body.precio,
            descuento:req.body.descuento,
            subcategoria_id:req.body.subcategoria,   
            descripcion:req.body.descripcion
        }) 
            .then (function(Producto){
             db.ImagenesProd.create({
                ruta: req.files[0].path,
                producto_id: Producto.id
                })
        });        
        
        res.redirect("/products/listardb")
    },
    editarProducto: function(req, res){
        let pedidoProducto = db.Productos.findByPk(req.params.ID);        
        let pedidoCategorias = db.Categorias.findAll();
        let pedidoSubcategorias = db.Subcategorias.findAll();        
        let pedidoimagenes = db.ImagenesProducto.findAll();
        Promise.all([pedidoProducto, pedidoCategorias, pedidoSubcategorias, pedidoimagenes])
        .then(function([producto, categorias, subcategorias, imagenes]){                               
            res.render("productEdit",{producto:producto, categorias:categorias, subcategorias:subcategorias,imagenes:imagenes})
            
        })
    },

    actualizarProducto: function(req, res){        
        db.Productos.update({
            nombre: req.body.nombreProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            descuento: req.body.descuentoProducto,
            categoria_id: req.body.rubroProducto,
            color: req.body.colorProducto,
            medidas: req.body.medidasProducto,
            descripcion: req.body.descripcionProducto,
            }, {
            where: {
                id: req.params.id
            }
        })
            .then(function () {
                if(req.files[0] == undefined){
                    res.redirect("/products");
                } else {
                    db.Imagenes.update({
                        ruta: req.files[0].filename
                    }, {
                        where: {
                            producto_id: req.params.id
                        }
                    })
                    .then(function () {
                        res.redirect("/peliculas/"+req.params.id);
                    })
                }
            })
    },


    cart:  function(req, res) {
        res.render('productCart');
    },
}
module.exports= productController