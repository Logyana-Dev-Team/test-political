const createError = require("http-errors");
const mongoose = require("mongoose");

const Takrar = require("../Models/Takrar.model");
const imageSchema = require("../Models/image.model");

const fs = require("fs");
module.exports = {
  getAllTakrars: async (req, res, next) => {
    try {
      const results = await Takrar.find({}, { __v: 0 }).sort({ updatedAt: -1 });
      // const results = await Takrar.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Takrar.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTakrar: async (req, res, next) => {
    // try {
    //     const Takrar = new Takrar(req.body);
    //     const result = await Takrar.save();
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

    // const files = req.files;

    // if(!files){
    //     const error = new Error('Please choose files');
    //     error.httpStatusCode = 400;
    //     return next(error)
    // }

    // // convert images into base64 encoding
    // let imgArray = files.map((file) => {
    //     let img = fs.readFileSync(file.path)

    //     return encode_image = img.toString('base64')
    // })

    // let images =[]
    // let result = imgArray.map((src, index) => {

    //     // create object to store data in the collection
    //     let finalImg = {
    //         filename : files[index].originalname,
    //         contentType : files[index].mimetype,
    //         imageBase64 : src
    //     }
    //     // console.log(finalImg);
    //     let newUpload = new imageSchema(finalImg);

    //     images.push(newUpload)
    // });

    // Promise.all(result)
    //     .then( msg => {
    //             // res.json(msg);
    //         res.redirect('/')
    //     })
    //     .catch(err =>{
    //         res.json(err);
    //     })

    const takrar = new Takrar({
      name: req.body.name,
      subject: req.body.subject,
      desc: req.body.desc,
    });
    takrar
      .save()
      .then((result) => {
        // console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },

  findTakrarById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const takrar = await Takrar.findById(id);
      // const takrar = await Takrar.findOne({ _id: id });
      if (!takrar) {
        throw createError(404, "Takrar does not exist.");
      }
      res.send(takrar);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Takrar id"));
        return;
      }
      next(error);
    }
  },

  updateATakrar: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Takrar.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Takrar does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Takrar Id"));
      }

      next(error);
    }
  },

  deleteATakrar: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Takrar.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Takrar does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Takrar id"));
        return;
      }
      next(error);
    }
  },
};
