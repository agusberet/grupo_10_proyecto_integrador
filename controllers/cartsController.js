const fs = require('fs');
const path = require('path');
const multer = require('multer');
const db = require('../src/database/models');

const cartsController = {
   mostrarCarrito: function(req, res, next) {
       res.render("productCart");
   }
}

module.exports = cartsController;
