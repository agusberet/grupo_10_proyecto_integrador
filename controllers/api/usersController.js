const fs = require('fs');
const path = require('path');
const db = require('../../src/database/models');

const usersController = {
    total: (req, res) => {
        db.Usuario.count().then((total) => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: '/api/users/total'
                },
                data: total,
            };
            res.json(respuesta);
        })
    },
};

module.exports = usersController;
