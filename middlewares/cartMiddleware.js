const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');

let cartMiddleware = function(req, res, next) {
    if(req.session.usuarioLogueado === undefined) {
        res.send("Para tener un carrito tenés que estar logueado");
    } else {
        db.Carrito.findOne({
            where : { 
                usuario_id: req.cookies.UsuarioID, 
            }
        })
        .then(function(carrito) {
            if(carrito.estado == 1){
                next();
            } else {
                res.send("Para acceder al carrito tenés que agregar productos");
            }
        });

    }
}



module.exports = cartMiddleware;