
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');
let bcrypt= require('bcrypt');
let {check, validationResult, body} =require('express-validator');

const productController={

    
  /*  listadb: function(req,res){
        try {
            let pedidoProductos= db.Producto.findAll(            
                {
                    include: [{association:"imagenes"}]
                }
            )
            let pedidoCategorias = db.Categoria.findAll();
            

            Promise.all([pedidoProductos, pedidoCategorias])  
                .then(function (productos, categorias) {
                    res.render('products', {productos:productos, categorias:categorias});
                });
        } catch (error) {
            console.log(error)
        }
    },  */


    filtrardb: function(req,res){ 
        db.Producto.findAll({
            where: {
               categoria_id: req.params.id
            },
            include: [{association:"imagenes"}] 
        }) 
        
        .then(function(productos) {            
        res.render("products", {productos:productos})
    })   


    },

   listadb: function(req,res){ //original, lo guardamos por si no funciona el filtro
        try {
            db.Producto.findAll(            
                {
                    include: [{association:"imagenes"}]
                }
            )

                .then(function (productos) {

                    res.render('products', {productos:productos});
                });
        } catch (error) {
            console.log(error)
        }
    },  
    listadoTabla: function(req,res){ 
        try {
            db.Producto.findAll(            
                {
                    include: [{association:"categorias"}]
                }
            )

                .then(function (productos) {

                    res.render('listadoProductos', {productos:productos});
                });
        } catch (error) {
            console.log(error)
        }
    },  
   
    ofertas:  function(req, res) { 
        db.Producto.findAll({
            where: {
               subcategoria_id: 1 //oferta
            },
            include: [{association:"imagenes"}] 
        }) 
        
        .then(function(productos) {            
        res.render("ofertas", {productos:productos})
    })   

    },  

     /*listado:  function(req, res) { //para el administador
        db.Producto.findAll() 
        .then(function(productos) {
        res.render("listado", {productos:productos})
    })   

    },  */

    productDetail: function(req, res) { //sirve de ejemplo (es del sprint3)
        res.render('productDetail');
    },    

    detail: function(req,res,next){
        db.Producto.findByPk(req.params.id, { //capturamos el id de la url
            include: ['categorias', 'subcategorias', 'imagenes'] //incluimos estas tablas asociada al producto
        })
            .then(function (product) {
                if (product) {
                    res.render("productDetail", {product:product});
                }
                else {
                    res.send("Producto inexistente")
                }
            })
    },

    productAdd: function(req, res,next) { 
        let pedidoCategorias= db.Categoria.findAll();
        let pedidoSubcategorias= db.Subcategoria.findAll();
       
        Promise.all([pedidoCategorias, pedidoSubcategorias])
        .then(function([categorias, subcategorias]){
            res.render("productAdd",{categorias:categorias, subcategorias:subcategorias})
        })
        
    },

    processAdd: function(req,res){     
        
        db.Producto.create({
            nombre:req.body.nombre,
            categoria_id:req.body.categoria,
            marca:req.body.marca,   
            precio:req.body.precio,
            descuento:req.body.descuento,
            subcategoria_id:req.body.subcategoria,   
            descripcion:req.body.descripcion
        }) 
            .then (function(Producto){
             db.Imagenes.create({
                ruta: "/" + req.files[0].filename,
                producto_id: Producto.id
                })
        });        
        
        res.redirect("/products") //la logica esta en listaDB
    },
    
    editarProducto: function(req, res){ //enviamos informacion del producto al formulario de edicion
        let pedidoProducto = db.Producto.findByPk(req.params.id, {
            include: [{ association: "imagenes" }] //pedimos las imagenes asociadas
        })

        let pedidoCategorias = db.Categoria.findAll();
        let pedidoSubcategorias = db.Subcategoria.findAll();  

        Promise.all([pedidoProducto, pedidoCategorias, pedidoSubcategorias])
        .then(function([product, categorias, subcategorias]){                               
            res.render("productEdit", {product:product, categorias:categorias, subcategorias:subcategorias})
            
        })
    },

    actualizarProducto: function(req, res){        
        db.Producto.update({ //"update" actualiza la informacion en la base de datos
            nombre:req.body.nombre,
            categoria_id:req.body.categoria,
            marca:req.body.marca,   
            precio:req.body.precio,
            descuento:req.body.descuento,
            subcategoria_id:req.body.subcategoria,   
            descripcion:req.body.descripcion
            }, {
            where: {
                id: req.params.id
            }
        })
        .then(function () {
            if(req.files[0] == undefined){
                res.redirect("/products"); //modificar para redirecionar a la lista de productos que ve el admin
            } else {
                db.Imagenes.update({
                    ruta: req.files[0].filename
                }, {
                    where: {
                        producto_id: req.params.id
                    }
                })
                .then(function () {
                    res.redirect("/products");
                })
            }
        })
    },
    borrar: function(req, res){ //eliminacion en cascada, elimina el registro y sus claves foraneas
        try {
        db.Producto.destroy({ //para eliminar el producto de la base de datos
            where: {
                id: req.params.id 
            }, 
            
        })
        .then(function () {
        res.redirect("/products");
        })
    } catch (error) {
    console.log(error)
    }
    },
    
   
    cart:  function(req, res) {
        res.render('productCart');
    },
}
module.exports= productController