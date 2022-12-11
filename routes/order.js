const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");

/* ==== create an order ==== */
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);
  console.log(newOrder);

  try {
    const savedOrder = await newOrder.save();
    res.send(savedOrder);
    console.log(savedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

/* ==== update an order ==== */
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updatedOrder);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
});

/* ==== delete order ==== */
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send("The order has been deleted");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

/* ==== Get user order ==== */
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    result = await Order.find({ userId: req.params.id });
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

/* ==== get all order ==== */
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log("orders get hit");
    const orders = await Order.find();
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});

/* ==== Get monthly revenue ==== */
router.get("/revenue", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
  try {
    const revenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastMonth },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.send(revenue);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(message);
  }
});
/* const deleteOrder = async () => {
  const query = await Order.deleteMany();
  console.log(query);
};
deleteOrder(); */

module.exports = router;
