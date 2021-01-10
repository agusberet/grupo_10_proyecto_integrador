const fs = require('fs');
const path = require('path');
const db = require('../../src/database/models');

const productsController={
    list: function(req,res){ 
        db.Producto.findAll({
            
            include: [{association:"imagenes"}] 
        }) 
        
        .then(function(productos) {            
            let respuesta = {
                meta: {
                    status: 200,
                    total: productos.length,
                    url: '/api/products',
                },
                data: productos,
            };
            res.json(respuesta);
    })   


    },
    find: (req, res) => {
        db.Producto.findByPk(req.params.id)
        .then((producto) => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/products/detalle/' + req.params.id,
                },
                data: producto,
            };
            res.json(respuesta);
        })
    },
    findProductos: (req, res) => {
        db.Producto.count() 
        
        .then(function(productos) {            
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/products/total',
                },
                data: productos,
            };
            res.json(respuesta);
    })
    },
    findCategorias: (req, res) => {
        db.Categoria.findAll().then((categorias) => {
        let respuesta = {
            meta: {
                status: 200,
                url: '/api/products/categorias',
            },
            data: categorias,
        };
        res.json(respuesta)
        })
    },
    contarCategorias:  (req, res) => {
        db.Categoria.count() 
        
        .then(function(productos) {            
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/products/categorias/total',
                },
                data: productos,
            };
            res.json(respuesta);
    })
},
}

module.exports = productsController;