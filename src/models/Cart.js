const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId;

const cartItemSchema = new Schema({
  product: {
    type: ObjectID,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  image_url: {
    type: String,
  },
});

const cartSchema = new Schema(
  {
    user: {
      type: ObjectID,
      ref: "User",
    },
    items: [cartItemSchema],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
