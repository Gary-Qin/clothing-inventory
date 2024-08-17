require("dotenv").config();

const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

const host = process.env.LOCALHOST || 3000;
app.listen(host, () => {
  console.log(`listening on port ${host}`);
});
