const createError = require('http-errors');
const mongoose = require('mongoose');
var request = require('request')

const Suchana = require('../Models/Suchana.model');

module.exports = {
  getAllSuchanas: async (req, res, next) => {
    try {
      const results = await Suchana.find({}, { __v: 0 }).sort({ updatedAt: -1 });
      // const results = await Suchana.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Suchana.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

   createNewSuchana: async (req, res, next) => {
    
  // try {
  //     const suchana = new Suchana(req.body);
  //     const result = await suchana.save();
  //     res.send(result);
  //   } catch (error) {
  //     console.log(error.message);
  //     if (error.name === 'ValidationError') {
  //       next(createError(422, error.message));
  //       return;
  //     }
  //     next(error);
  //   }

    /*Or:
  If you want to use the Promise based approach*/

  var sendMessage = function(message){
    // console.log("message working")
    var restKey = 'NmNhYjA0ZjktNGQyNy00NjAwLThjZDMtN2VmYzZiMjU1MGNi';
    var appID = 'b9afa456-b1f1-4d3b-a7a8-133799961474';
    request(
      {
        method:'POST',
        uri:'https://onesignal.com/api/v1/notifications',
        headers: {
          "authorization": "Basic "+restKey,
          "content-type": "application/json"
        },
        json: true,
        body:{
          'app_id': appID,
          'contents': {en: message.title},
          'included_segments': ["Subscribed Users"],
          'data': message,
          'headings':{"en": "Notification Added"}
        }
      },
      function(error, response, body) {
        if(!body.errors){
          console.log(body);
        }else{
          console.error('Error:', body.errors);
        }
        
      }
    );
  }
    
  const suchana = new Suchana({
    title: req.body.title,
    desc: req.body.desc,
    link: req.body.link
  });
  suchana
    .save()
    .then(result => {
      console.log(result);
      res.send(result);
      sendMessage(result)
    })
    .catch(err => {
      console.log(err.message);
    }); 
    
  },

  findSuchanaById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const suchana = await Suchana.findById(id);
      // const suchana = await Suchana.findOne({ _id: id });
      if (!suchana) {
        throw createError(404, 'Suchana does not exist.');
      }
      res.send(suchana);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Suchana id'));
        return;
      }
      next(error);
    }
  },

  updateASuchana: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Suchana.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Suchana does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Suchana Id'));
      }

      next(error);
    }
  },

  deleteASuchana: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Suchana.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Suchana does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Suchana id'));
        return;
      }
      next(error);
    }
  }
};
