const Admin = require("../Models/admins");
const bcrypt = require("bcrypt");
const jwttoken = require("../Controllers/jwt.controller");

exports.adminLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  Admin.find({ email: email })
    .exec()
    .then((doc) => {
      //check if email is present
      if (doc.length < 1) {
        res.status(400).json({
          message: "User not registered",
          error: "Email cannot be found",
        });
      } else {
        //check password match
        if (password === doc[0].password) {
          //create token
          const role = "admin";
          const time = 60*60;
          // const time = 60;
          const jwt = new jwttoken();
          const token = jwt.createToken(email,role, time);

          //return response
          res.status(200).json({
            message: "success",
            userId: doc[0]._id,
            token: token,
          });
        }
        else {
            res.status(401).json({
              message: "Email and password combination doesnt match",
            //   error: err,
            });
          }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal server error",
        error: err,
      });
    });
};
