const express = require('express');
const router = express.Router();

const MahitiController = require('../Controllers/Mahiti.Controller');

//Get a list of all Mahitis
router.get('/', MahitiController.getAllMahitis);

//Create a new Mahiti
router.post('/', MahitiController.createNewMahiti);

//Get a Mahiti by id
router.get('/:id', MahitiController.findMahitiById);

//Update a Mahiti by id
router.patch('/:id', MahitiController.updateAMahiti);

//Delete a Mahiti by id
// router.delete('/:id', MahitiController.deleteAMahiti);

module.exports = router;
