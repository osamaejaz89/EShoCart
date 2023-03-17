const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Auth = require("../middlewares/auth.middleware");

const router = new express.Router();

//get cart items

router.get("/cart", Auth, async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await Cart.findOne({user: owner });
    if (cart && cart.items.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
});

//add cart
router.post("/cart", Auth, async (req, res) => {
  const owner = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({user: owner });
    const product = await Product.findOne({ _id: productId });
    
    if (!product) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const price = product.price;
    const name = product.name;
    //If cart already exists for user,
    if (cart) {
      const productIndex = cart.items.findIndex(
        (item) => item.product == productId
      );
      //check if product exists or not

      if (productIndex > -1) {
        let product = cart.items[productIndex];

        product.quantity += quantity;

        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);

        cart.items[productIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.items.push({ product, name, quantity, price });
        cart.bill = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        user: owner,
        items: [{ product, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

//delete item in cart

router.delete("/cart/", Auth, async (req, res) => {
  const owner = req.user._id;
  const productId = req.query.productId;
  try {
    let cart = await Cart.findOne({ owner });

    const productIndex = cart.items.findIndex(
      (item) => item.product == productId
    );

    if (productIndex > -1) {
      let product = cart.items[productIndex];
      cart.bill -= product.quantity * product.price;
      if (cart.bill < 0) {
        cart.bill = 0;
      }
      cart.items.splice(productIndex, 1);
      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
      res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
