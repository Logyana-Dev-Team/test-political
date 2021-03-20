const express = require('express');
const router = express.Router();
const store = require('./multer')

const KaryaController = require('../Controllers/Karya.Controller');
const auth = require('../Controllers/auth.conroller');

//Get a list of all Karyas
router.get('/', KaryaController.getAllKaryas);

//Create a new Karya
router.post('/', KaryaController.createNewKarya);



//Get a Karya by id
router.get('/:id', KaryaController.findKaryaById);

//Update a Karya by id
router.patch('/:id', KaryaController.updateAKarya);

//Delete a Karya by id
router.delete('/:id', KaryaController.deleteAKarya);

//  Images adding and deleting as to update
router.post('/image/:id', KaryaController.addAImage);

router.delete('/:id/:imageId', KaryaController.deleteAImage);

module.exports = router;
