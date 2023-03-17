const express = require("express");
const User = require("../models/User");
const Auth = require("../middlewares/auth.middleware");

const router = new express.Router();

//signup
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.generateAuthToken();
    await user.save();
  user.password = undefined;
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    await user.generateAuthToken();
    user.password = undefined;
    res.send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

//logout
router.post("/users/logout", Auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//Logout All
router.post("/users/logoutAll", Auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
module.exports = router;
