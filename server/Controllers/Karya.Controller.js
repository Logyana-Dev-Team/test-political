const createError = require("http-errors");
const mongoose = require("mongoose");
var request = require("request");
const Karya = require("../Models/Karya.model");
const imageSchema = require("../Models/image.model");

const fs = require("fs");
const { deleteImages } = require("./Images.Controller");

module.exports = {
  getAllKaryas: async (req, res, next) => {
    try {
      const results = await Karya.find({}).sort({ updatedAt: -1 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewKarya: async (req, res, next) => {
    // uploads = (req, res , next) => {
    // console.log("Response",req.files);

    const getData = async () => {
      await karya
        .find({})
        .exec()
        .then((response) => {
          // res.json({docs:data[0]
          // })
          console.log(response);
        })
        .catch((err) => console.log(err));
    };

    var sendMessage = function (title,id,desc,link,createdAt){
      console.log("message working")
      var restKey = "NmNhYjA0ZjktNGQyNy00NjAwLThjZDMtN2VmYzZiMjU1MGNi";
      var appID = "b9afa456-b1f1-4d3b-a7a8-133799961474";
      request(
        {
          method: "POST",
          uri: "https://onesignal.com/api/v1/notifications",
          headers: {
           "authorization": "Basic " + restKey,
            "content-type": "application/json",
          },
          json: true,
          body:{
            'app_id': appID,
            'contents': {"en": title},
            'included_segments': ["Subscribed Users"],
            'data': {id,title,desc,link,createdAt},
            'headings':{"en": "Our Work Added"}
          }
        },
        function (error, response, body) {
          if (!body.errors) {
            console.log(body);
          } else {
            console.error("Error:", body.errors);
          }
        }
      );
    };
    // sendMessage(req.body.title);
    // const files = req.files;

    // if (!files) {
    //   const error = new Error("Please choose files");
    //   error.httpStatusCode = 400;
    //   return next(error);
    // }

    // convert images into base64 encoding
    // let imgArray = files.map((file) => {
    //   let img = fs.readFileSync(file.path);

    //   return (encode_image = img.toString("base64"));
    // });

    let images = [];
    let videolink="";
    if(req.body.action === "Video")
    {
    videolink=req.body.videolink
}
else {   
    
    const fileArray=req.body.fileArray;
    // console.log(fileArray);

    let result = fileArray.map((item) => {
      // create object to store data in the collection
      let finalImg = {
        filename: item.fileURL,
      };
      // console.log(finalImg);
      let newUpload = new imageSchema(finalImg);

      images.push(newUpload);
    });

}
// console.log(images);   
    const karya = new Karya({
      title: req.body.title,
      desc: req.body.desc,
      link: req.body.link,
      images: images,
      videolink:videolink
    });
    karya
      .save()
      .then((result) => {
        // console.log(result);
        res.send(result);
        // sendMessage(result.title,result._id,result.desc,result.link,result.createdAt)
        console.log(result.title,result._id)
      })
      .catch((err) => {
        console.log(err.message);
      });
    // getData();
  },

  findKaryaById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const karya = await Karya.findById(id);
      // const karya = await Karya.findOne({ _id: id });
      if (!karya) {
        throw createError(404, "Karya does not exist.");
      }
      res.send(karya);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Karya id"));
        return;
      }
      next(error);
    }
  },

  updateAKarya: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Karya.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Karya does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Karya Id"));
      }

      next(error);
    }
  },

  deleteAKarya: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Karya.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Karya does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Karya id"));
        return;
      }
      next(error);
    }
  },
  addAImage: async (req, res, next) => {
    const id = req.params.id;
    const fileURL=req.body.fileURL
    // const file = req.file;

    // if (!file) {
    //   const error = new Error("Please choose file");
    //   error.httpStatusCode = 400;
    //   return next(error);
    // }

    let finalImg = {
      filename: fileURL
    };
    const newImage = new imageSchema(finalImg);

    const karya = await Karya.findByIdAndUpdate(id, {
      $push: { images: [newImage] },
    });
    karya
      .save()
      .then((result) => {
        // console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  deleteAImage: async (req, res, next) => {
    const id = req.params.id;
    const imageId = req.params.imageId;
    try {
      const result = await Karya.findByIdAndUpdate(id, {
        $pull: { images: { _id: imageId } },
      });
      // console.log(result);
      if (!result) {
        throw createError(404, "Karya does not exist.");
      }
      deleteImages(result.filename,"string")
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Karya id"));
        return;
      }
      next(error);
    }
  },
};
