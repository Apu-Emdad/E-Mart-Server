const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Product = require("../models/Product");

/* ==== create a product ====*/
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ==== update Product ====*/
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});

/* ==== delete Product ====*/
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("The product has been deleted");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

/* ==== get single Product ====*/
router.get("/find/:id", async (req, res) => {
  try {
    result = await Product.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

/* ==== get all Product ====*/
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Products;
    if (qNew) {
      Products = await Product.find().sort({ _id: -1 }).limit(1);
    } else if (qCategory) {
      Products = await Product.find({
        categories: { $in: [qCategory] },
      });
    } else {
      Products = await Product.find();
    }
    res.send(Products);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

/* ====deleting the products ==== */
/* 
const deleteProduct = async () => {
  const query = await Product.deleteMany();
  console.log(query);
};
deleteProduct(); 
 */

module.exports = router;
