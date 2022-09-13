const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
/* ==== Register ==== */
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err.message);
  }
});

/* ==== Login ==== */
router.post("/login", async (req, res) => {
  try {
    const inputEmail = req.body.email.toLowerCase();
    const inputPassword = req.body.password;
    //finding user by email
    const user = await User.findOne({
      email: inputEmail,
    });
    // verifying user by email
    !user && res.status(401).json("wrong credentials");
    // decrypting the user password at db
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    //getting the original password from decrypted password
    const originalPasswrod = hashedPassword.toString(CryptoJS.enc.Utf8);
    // creating the token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    //destructuring user
    const { password, ...rest } = user._doc;

    //sending the token and rest
    inputPassword === originalPasswrod
      ? res.status(201).json({ accessToken, ...rest })
      : res.status(401).json("wrong credentials");
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
});

module.exports = router;
