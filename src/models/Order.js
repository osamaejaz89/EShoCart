const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId;

const orderSchema = new Schema(
  {
    user: {
      type: ObjectID,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectID,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
