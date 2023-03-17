const express = require("express");
const Product = require("../models/Product");
const Auth = require("../middlewares/auth.middleware");

const router = new express.Router();

//fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

//fetch an item
router.get("/products/:id", async (req, res) => {
  try {
    const item = await Product.findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//create an item
router.post("/products", Auth, async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      owner: req.user._id,
    });
    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    console.log({ error });
    res.status(400).send({ message: "error" });
  }
});

//update an item

router.patch("/products/:id", Auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "category", "price"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete item
router.delete("/products/:id", Auth, async (req, res) => {
  try {
    const deletedItem = await Product.findOneAndDelete({ _id: req.params.id });
    if (!deletedItem) {
      res.status(404).send({ error: "Item not found" });
    }
    res.send(deletedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
