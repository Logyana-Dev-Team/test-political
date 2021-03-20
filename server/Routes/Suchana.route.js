const express = require('express');
const router = express.Router();

const SuchanaController = require('../Controllers/Suchana.Controller');
const auth = require('../Controllers/auth.conroller');

//Get a list of all Suchanas
router.get('/', SuchanaController.getAllSuchanas);

//Create a new Suchana
router.post('/', SuchanaController.createNewSuchana);

//Get a Suchana by id
router.get('/:id', SuchanaController.findSuchanaById);

//Update a Suchana by id
router.patch('/:id', SuchanaController.updateASuchana);

//Delete a Suchana by id
router.delete('/:id', SuchanaController.deleteASuchana);

module.exports = router;
