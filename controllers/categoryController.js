const db = require("../db/queries");

const categoryCreateGet = (req, res) => {
  res.render("categoryform", { title: "Add Category" });
};

const categoryCreatePost = (req, res) => {
  console.log(req.body);
  res.redirect("/categories");
};

const categoryIdGet = async (req, res) => {
  const category = await db.getCategoryById(req.params.id);
  const clothes = await db.getClothesForCategory(req.params.id);
  console.log(category);
  console.log();
  console.log(clothes);
  console.log();
  console.log();
  res.send(`logged category with id ${req.params.id} and its clothes`);
};

module.exports = { categoryCreateGet, categoryCreatePost, categoryIdGet };
