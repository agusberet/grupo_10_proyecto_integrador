const express = require('express');
const router = express.Router();
const fs = require("fs");
const usersController = require('../../controllers/api/usersController');

 router.get('/total', usersController.total) 

module.exports = router;