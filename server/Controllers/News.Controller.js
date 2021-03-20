const createError = require("http-errors");
const mongoose = require("mongoose");

const News = require("../Models/News.model");

const fs = require("fs");
const { deleteImages } = require("./Images.Controller");

module.exports = {
  getAllNewss: async (req, res, next) => {
    try {
      const results = await News.find({}).sort({ updatedAt: -1 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewNews: async (req, res, next) => {
    const {fileURL}=req.body;

    let finalImg = {
      filename: fileURL,
    };

    const news = new News(finalImg);

    news
      .save()
      .then((result) => {
        // console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  // banner
  //   .save()
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(err => {
  //     console.log(err.message);
  //   });
  // uploads = (req, res , next) => {
  // console.log("Response",req.files);
  //       const file = req.file;

  //       if(!files){
  //           const error = new Error('Please choose files');
  //           error.httpStatusCode = 400;
  //           return next(error)
  //       }

  //       // convert images into base64 encoding
  //       let imgArray = files.map((file) => {
  //           let img = fs.readFileSync(file.path)

  //           return encode_image = img.toString('base64')
  //       })

  //       let images =[]
  //       let result = imgArray.map((src, index) => {

  //           // create object to store data in the collection
  //           let finalImg = {
  //               filename : files[index].originalname,
  //               contentType : files[index].mimetype,
  //               imageBase64 : src
  //           }
  //           // console.log(finalImg);
  //           let newUpload = new imageSchema(finalImg);

  //           images.push(newUpload)
  //       });

  //       Promise.all(result)
  //           .then( msg => {
  //                   // res.json(msg);
  //               res.redirect('/')
  //           })
  //           .catch(err =>{
  //               res.json(err);
  //           })

  //   const images = new Images({
  //     title: req.body.title,
  //     desc: req.body.desc,
  //     link: req.body.link,
  //     images: images
  //   });
  //   images
  //     .save()
  //     .then(result => {
  //       // console.log(result);
  //       res.send(result);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });

  findNewsById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const news = await News.findById(id);
      // const news = await News.findOne({ _id: id });
      if (!news) {
        throw createError(404, "News does not exist.");
      }
      res.send(news);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid News id"));
        return;
      }
      next(error);
    }
  },

  updateANews: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await News.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "News does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid News Id"));
      }

      next(error);
    }
  },

  deleteANews: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await News.findByIdAndDelete(id);
      // console.log('DATA')
      // console.log(result.filename)
      // console.log(result);
      if (!result) {
        throw createError(404, "News does not exist.");
      }
      deleteImages(result.filename,"string")
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid News id"));
        return;
      }
      next(error);
    }
  },

};
