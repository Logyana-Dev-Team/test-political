const express = require('express');
const router = express.Router();

const YojanaController = require('../Controllers/Yojana.Controller');

//Get a list of all yojanas
router.get('/', YojanaController.getAllYojanas);

//Create a new yojana
router.post('/', YojanaController.createNewYojana);

//Get a yojana by id
router.get('/:id', YojanaController.findYojanaById);

//Update a Yojana by id
router.patch('/:id', YojanaController.updateAYojana);

//Delete a Yojana by id
router.delete('/:id', YojanaController.deleteAYojana);

module.exports = router;
