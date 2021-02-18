const express = require('express');
const router = express.Router();
const store = require('./multer')

const ProfileController = require('../Controllers/Profile.Controller');

//Get a list of Profile
router.get('/', ProfileController.getAllProfiles);

//Create a new Profile
router.post('/:id', store.single('images') ,ProfileController.createNewProfile);

//Get a Profile by id
router.get('/:id', ProfileController.findProfileById);

//Update a Profile by id
router.patch('/:id', ProfileController.updateAProfile);

//Delete a Profile by id
router.delete('/:id', ProfileController.deleteAProfile);
// router.delete('/image/:id', ProfileController.deleteAImage);

module.exports = router;
