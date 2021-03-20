const express = require('express');
const router = express.Router();

const store = require('./multer')
const TakrarController = require('../Controllers/Takrar.Controller');
const auth = require('../Controllers/auth.conroller');

//Get a list of all Takrars
router.get('/', TakrarController.getAllTakrars);

//Create a new Takrar
router.post('/', TakrarController.createNewTakrar);

//Get a Takrar by id
router.get('/:id', TakrarController.findTakrarById);

//Update a Takrar by id
router.patch('/:id', TakrarController.updateATakrar);

//Delete a Takrar by id
router.delete('/:id', TakrarController.deleteATakrar);

module.exports = router;
