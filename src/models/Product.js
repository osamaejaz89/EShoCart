const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId;

const productSchema = new Schema(
  {
    owner: {
      type: ObjectID,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      type: String,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
