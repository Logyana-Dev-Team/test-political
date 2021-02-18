const express = require('express');
const router = express.Router();
const store = require('./multer')

const NewsController = require('../Controllers/News.Controller');

//Get a list of all Newss
router.get('/', NewsController.getAllNewss);

//Create a new News
router.post('/', store.single('images') ,NewsController.createNewNews);


//Get a News by id
router.get('/:id', NewsController.findNewsById);

//Update a News by id
router.patch('/:id', NewsController.updateANews);

//Delete a News by id
router.delete('/:id', NewsController.deleteANews);
// router.delete('/image/:id', NewsController.deleteAImage);

module.exports = router;
