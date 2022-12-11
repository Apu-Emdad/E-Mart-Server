const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    products: [
      {
        _id: { type: String, required: true },
        title: { type: String, required: true },

        img: { type: String, required: true },
        categories: [{ type: String, uppercase: true }],
        size: [{ type: String, uppercase: true }],
        color: [{ type: String, default: "All" }],
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true },

        productQuantity: { type: Number, default: 1 },
        subtotal: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
    totalOrders: { type: Number, required: true },

    address: { type: Object, default: "USA", required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
