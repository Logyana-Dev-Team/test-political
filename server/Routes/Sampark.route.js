const express = require('express');
const router = express.Router();

const SamparkController = require('../Controllers/Sampark.Controller');

//Get a list of all Samparks
router.get('/', SamparkController.getAllSamparks);

//Create a new Sampark
router.post('/', SamparkController.createNewSampark);

//Get a Sampark by id
router.get('/:id', SamparkController.findSamparkById);

//Update a Sampark by id
// router.patch('/:id', SamparkController.updateASampark);

//Delete a Sampark by id
router.delete('/:id', SamparkController.deleteASampark);

module.exports = router;
