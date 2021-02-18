const express = require('express');
const router = express.Router();
const store = require('./multer')

const BannerController = require('../Controllers/Banner.Controller');

//Get a list of banner
router.get('/', BannerController.getAllBanners);

//Create a new Banner
router.post('/:id', store.single('images'),BannerController.createNewBanner);

//Get a Banner by id
router.get('/:id', BannerController.findBannerById);

//Update a Banner by id
router.patch('/:id', BannerController.updateABanner);

//Delete a Banner by id
router.delete('/:id', BannerController.deleteABanner);
// router.delete('/image/:id', BannerController.deleteAImage);

module.exports = router;
