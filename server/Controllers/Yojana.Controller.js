const createError = require('http-errors');
const mongoose = require('mongoose');
var request = require('request')

const Yojana = require('../Models/Yojana.model');

module.exports = {
  getAllYojanas: async (req, res, next) => {
    try {
      const results = await Yojana.find({}, { __v: 0 }).sort({ updatedAt: -1 });
      // const results = await Yojana.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Yojana.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

   createNewYojana: async (req, res, next) => {
    
  // try {
  //     const yojana = new Yojana(req.body);
  //     const result = await yojana.save();
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
          'headings':{"en": "Government Scheme Added"}
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
    
  const yojana = new Yojana({
    title: req.body.title,
    desc: req.body.desc,
    link: req.body.link
  });
  yojana
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

  findYojanaById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const yojana = await Yojana.findById(id);
      // const yojana = await Yojana.findOne({ _id: id });
      if (!yojana) {
        throw createError(404, 'Yojana does not exist.');
      }
      res.send(yojana);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Yojana id'));
        return;
      }
      next(error);
    }
  },

  updateAYojana: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Yojana.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Yojana does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Yojana Id'));
      }

      next(error);
    }
  },

  deleteAYojana: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Yojana.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Yojana does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Yojana id'));
        return;
      }
      next(error);
    }
  }
};
