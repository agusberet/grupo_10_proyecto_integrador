const fs = require('fs');
const path = require('path');
const db = require('../../src/database/models');

const cartsController = {
    cerrado: (req, res) => {
        db.Carrito.findAll({
            where: {
                estado: 0,
            }
        }).then((cerrados) => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/carts/closed'
                },
                data: cerrados.length,
            }
            res.json(respuesta)
        })
    },
};

module.exports = cartsController;