const express = require('express');
const auth = require('../Controllers/auth.conroller');
const router = express.Router();

const VideosController = require('../Controllers/Videos.Controller');

//Get a list of all Videoss
router.get('/', VideosController.getAllVideoss);

//Create a new Videos
router.post('/', VideosController.createNewVideos);

//Get a Videos by id
router.get('/:id', VideosController.findVideosById);

//Update a Videos by id
router.patch('/:id', VideosController.updateAVideos);

//Delete a Videos by id
router.delete('/:id', VideosController.deleteAVideos);

module.exports = router;