const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
var logger = require('morgan');
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true,}));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: "Our little secret political app.",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hour
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


const ProductRoute = require('./Routes/Product.route');
const YojanaRoute = require('./Routes/Yojana.route');
const SuchanaRoute = require('./Routes/Suchana.route');
const KaryaRoute = require('./Routes/Karya.route');
const SamparkRoute = require('./Routes/Sampark.route');
const MahitiRoute = require('./Routes/Mahiti.route');
const TakrarRoute = require('./Routes/Takrar.route');
const Profile = require('./Routes/Profile.route');
const Banner = require('./Routes/Banner.route');
const Images = require('./Routes/Images.route');
const News = require('./Routes/News.route');
const Videos = require('./Routes/Videos.route');
const Admin = require('./Routes/admin.route');

  mongoose.connect(
   process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }, () => {
        console.log("connected to database");
    })

// Initialize DB
// require('./initDB')();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Control-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  email: String,
  mobile: String,
  password: String,
  address: String,
  // ward:String,
  username:String
},{
  timestamps:true
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use("local", User.createStrategy());

app.use(async (req, res, next) => {
  try {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.post("/register", function (req, res) {
  const Name = req.body.name;
  const Dob = req.body.dob;
  // const Email = req.body.email
  const Mobile = req.body.mobile
  const Address = req.body.address
  // const Ward = req.body.ward


  User.register(
    {
      name: Name,
      dob: Dob,
      // email: Email,
      address: Address,
      // ward:Ward,
      mobile: Mobile,
      username:req.body.mobile
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.send(user)
        res.redirect(req.get("referer"));
      }
    }
  );
});

app.post("/login", function (req, res) {
  console.log(req.body)
  const user = new User({
    username: req.body.mobile,
    password: req.body.password,
  });


  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        // console.log(req.user);
        res.send(req.user)
        // res.redirect(req.get("referer"));
      });
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.send("user logout");
});

app.get("/users", async (req, res, next) => {
  try {
    const results = await User.find({}).sort({ updatedAt: -1 });
    // const results = await Mahiti.find({}, { name: 1, price: 1, _id: 0 });
    // const results = await Mahiti.find({ price: 699 }, {});
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
})
// get user by userId 
app.get('/users/:userId',async (req,res)=>{
  const id = req.params.userId;

  try{
      const userById = await User.findById(id);
      console.log(userById);
      if(userById){
          res.status(200).json({user:userById});
      }else{
          res.status(404).json({ message:'No valid entry found for provided ID'});
      }
  
  }catch(err){
      console.log(err);
      res.status(500).json({error:err});
  }
});

app.delete('/users/:userId',async (req, res, next) => {
  const id = req.params.userId;
  try {
    const result = await User.findByIdAndDelete(id);
    // console.log(result);
    if (!result) {
      throw createError(404, 'User Not deleted ');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid User id'));
      return;
    }
    next(error);
  }
});


app.use('/products', ProductRoute);
app.use('/yojana', YojanaRoute);
app.use('/suchana',SuchanaRoute);
app.use('/karya',KaryaRoute);
app.use('/sampark',SamparkRoute);
app.use('/mahiti',MahitiRoute);
app.use('/takrar',TakrarRoute);
app.use('/profile',Profile);
app.use('/banner',Banner);
app.use('/images',Images);
app.use('/videos',Videos);
app.use('/news',News);
app.use('/admin',Admin);

//404 handler and pass to error handler
app.use((req, res, next) => {
  /*
  const err = new Error('Not found');
  err.status = 404;
  next(err);
  */
  // You can use the above code if your not using the http-errors module
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("app running on port:" + PORT);
});
