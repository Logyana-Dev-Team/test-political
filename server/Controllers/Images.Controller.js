const createError = require("http-errors");
const mongoose = require("mongoose");

const Images = require("../Models/image.model");

const fs = require("fs");
const path = require("path");
module.exports = {
  deleteImages: async (images, mode) => {
    var basePath = path.resolve(__dirname + "../../") + "/uploads/";
    console.log(basePath);
    let filePath = "";

    filePath = basePath + images;
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      console.log("Exists image");
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        return err;
      }
    });
  },

  getAllImagess: async (req, res, next) => {
    try {
      const results = await Images.find({}).sort({ updatedAt: -1 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewImages: async (req, res, next) => {
    const {fileURL}=req.body;

    let finalImg = {
      filename: fileURL,
    };
    const images = new Images(finalImg);

    images
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

  findImagesById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const images = await Images.findById(id);
      // const images = await Images.findOne({ _id: id });
      if (!images) {
        throw createError(404, "Images does not exist.");
      }
      res.send(images);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Images id"));
        return;
      }
      next(error);
    }
  },

  updateAImages: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Images.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Images does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Images Id"));
      }

      next(error);
    }
  },

  deleteAImages: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Images.findByIdAndDelete(id);
      console.log(result);
      if (!result) {
        throw createError(404, "Images does not exist.");
      }
      // if(result)
      // this.deleteAImages(result.image)
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Images id"));
        return;
      }
      next(error);
    }
  },
};
