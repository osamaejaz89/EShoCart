const express = require("express");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
require('./db/mongoose')
// const { routes } = require("./routes/auth.routes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
// app.use("/auth", routes);

app.listen(port, () => {
  console.log("server listening on port " + port);
});
