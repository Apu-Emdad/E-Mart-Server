const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require("../models/User");

//update password
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});

//delete account
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("The account has been deleted");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

//get single user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    result = await User.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

//get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

//Get user stat
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },

      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.send(data);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = router;
