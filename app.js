require("dotenv").config();

const express = require("express");
const app = express();
const path = require("node:path");
const homeRouter = require("./routes/homeRouter");

const assetsPath = path.join(__dirname, "public/styles");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);

const host = process.env.LOCALHOST || 3000;
app.listen(host, () => {
  console.log(`listening on port ${host}`);
});
