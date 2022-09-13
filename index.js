const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connencted with mongoose"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/e-mart/users", userRoute);
app.use("/e-mart/auth", authRoute);
app.use("/e-mart/products", productRoute);
app.use("/e-mart/carts", cartRoute);
app.use("/e-mart/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello from E-Mart");
});
app.listen(port, () => {
  console.log("listening to port:", port);
});
