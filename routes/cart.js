const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart");

/* ==== create a Cart ====*/
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.send(savedCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ==== update Cart ====*/
/* router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const cartId = req.query.cartId;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedCart);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
}); */

/* ==== update Cart ====*/
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedCart = await Cart.updateOne(
      { userId: userId },
      {
        $set: req.body,
      }
    );
    res.send(updatedCart);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});

/* ==== delete Cart ====*/
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const filter = { userId: req.params.id };
  try {
    await Cart.deleteOne(filter);
    res.send("The Cart has been deleted");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

/* ==== get user Cart ====*/
router.get("/find/:userId", async (req, res) => {
  try {
    result = await Cart.findOne({ userId: req.params.userId });
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

/* ==== get all Cart ====*/
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.send(carts);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

/* ====deleting the Carts ==== */
/* 
const deleteCart = async () => {
  const query = await Cart.deleteMany();
  console.log(query);
};
deleteCart(); 
 */

module.exports = router;
