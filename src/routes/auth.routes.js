const express = require("express");
const { pipe } = require("ramda");
const { login, register, getProfile } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const routes = express.Router();

routes.post("/login", pipe(login));
routes.post("/register", pipe(register));
routes.get("/me", authenticate, pipe(getProfile));

module.exports = { routes };
