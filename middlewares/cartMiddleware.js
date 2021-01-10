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
                usuario_id: req.cookies.usuarioID,
                estado: 1,
            }
        })
        .then(function(estado){
            if(estado) {
                db.Carrito_Producto.findOne({
                    where: {
                        carrito_id: estado.id,
                    }
                })
                .then(function(estado) {
                if(estado) {
                next();
            } else { res.send("Para tener un carrito tenes que agregar productos");
        db.Carrito.update({
            estado: 0,
        }, {
            where: {
                usuario_id: req.cookies.usuarioID,
                estado: 1,
            }
        })}
        });

    } else {  res.send("Para tener un carrito tenes que agregar productos")}
})
}
}



module.exports = cartMiddleware;