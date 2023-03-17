const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Database Connection is ready... ");
  })
  .catch((err) => {
    console.log(err);
  });;
