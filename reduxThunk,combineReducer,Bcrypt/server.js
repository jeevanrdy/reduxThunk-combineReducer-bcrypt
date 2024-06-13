let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer");
let jwt = require("jsonwebtoken");
let dotenv = require("dotenv");
let bcrypt = require("bcrypt");
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  profilePic: String,
});

let User = new mongoose.model("user", userSchema);

app.post("/validateToken", upload.none(), async (req, res) => {
  // console.log(req.body.token);
  let decrpDetails = jwt.verify(req.body.token, "seckeylogin");
  // console.log(decrpDetails);

  let userDetailsArr = await User.find().and({ email: decrpDetails.email });
  if (userDetailsArr.length > 0) {
    if (userDetailsArr[0].password === decrpDetails.password) {
      let loggedInDetails = {
        firstName: userDetailsArr[0].firstName,
        lastName: userDetailsArr[0].lastName,
        age: userDetailsArr[0].age,
        email: userDetailsArr[0].email,
        profilePic: userDetailsArr[0].profilePic,
      };
      res.json({ status: "success", data: loggedInDetails });
    } else {
      res.json({ status: "failure", msg: "Invaid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "User does not exist" });
  }
});

app.post("/register", upload.single("profilePic"), async (req, res) => {
  // console.log(req.file);

  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.file.path,
    });
    await User.insertMany([newUser]);
    res.json({ status: "Success", msg: "Account created successfully" });
  } catch (error) {
    res.json({
      status: "Failure",
      msg: "Unable to create account",
      error: error,
    });
  }
});
app.post("/login", upload.none(), async (req, res) => {
  // console.log(req.body);

  let userDetailsArr = await User.find().and({ email: req.body.email });
  if (userDetailsArr.length > 0) {
    let checkPassword = await bcrypt.compare(
      req.body.password,
      userDetailsArr[0].password
    );
    if (checkPassword === true) {
      let encrpdetails = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "seckeylogin"
      );
      let loggedInDetails = {
        firstName: userDetailsArr[0].firstName,
        lastName: userDetailsArr[0].lastName,
        age: userDetailsArr[0].age,
        email: userDetailsArr[0].email,
        profilePic: userDetailsArr[0].profilePic,
        token: encrpdetails,
      };
      res.json({ status: "success", data: loggedInDetails });
    } else {
      res.json({ status: "failure", msg: "Invaid Password" });
    }
  } else {
    res.json({ status: "failure", msg: "User does not exist" });
  }
});
app.put("/updateUserDetails", upload.single("profilePic"), async (req, res) => {
  // console.log(req.body);
  try {
    if (req.body.firstName.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { firstName: req.body.firstName }
      );
    }
    if (req.body.lastName.trim().length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { lastName: req.body.lastName }
      );
    }
    if (req.body.age.trim().length > 0) {
      await User.updateMany({ email: req.body.email }, { age: req.body.age });
    }
    if (req.body.password.length > 0) {
      await User.updateMany(
        { email: req.body.email },
        { password: req.body.password }
      );
    }
    if (req.file) {
      await User.updateMany(
        { email: req.body.email },
        { profilePic: req.file.path }
      );
    }

    res.json({ status: "success", msg: "User Details Updated" });
  } catch (err) {
    res.json({ status: "failure", msg: "User Details Not Updated", err: err });
  }
});
app.delete("/deleteAcc", upload.none(), async (req, res) => {
  let result = await User.deleteMany({ email: req.body.email });
  if (result.acknowledged == true) {
    res.json({ status: "success", msg: "User Deleted Successfully" });
  } else {
    res.json({ status: "failure", msg: "Unable to Delete User" });
  }
});

app.listen(process.env.port, () => {
  console.log("Listening to port 4444");
});

let connectToMdb = async () => {
  try {
    await mongoose.connect(process.env.mdbAtlasUrl);
    console.log("Connected to MDB");
  } catch (error) {
    console.log("Unable to connect to MDB");
  }
};

connectToMdb();
