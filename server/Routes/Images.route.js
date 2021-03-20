const express = require('express');
const router = express.Router();
const store = require('./multer')

const ImagesController = require('../Controllers/Images.Controller');
const auth = require('../Controllers/auth.conroller');

//Get a list of all Imagess
router.get('/', ImagesController.getAllImagess);

//Create a new Images
router.post('/',ImagesController.createNewImages);


//Get a Images by id
router.get('/:id', ImagesController.findImagesById);

//Update a Images by id
router.patch('/:id', ImagesController.updateAImages);

//Delete a Images by id
router.delete('/:id', ImagesController.deleteAImages);
// router.delete('/image/:id', ImagesController.deleteAImage);

module.exports = router;
