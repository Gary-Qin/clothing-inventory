const db = require("../db/queries");

const categoryCreateGet = (req, res) => {
  res.render("categoryform", { title: "Add Category" });
};

const categoryCreatePost = async (req, res) => {
  await db.createCategory(req.body.category);
  res.redirect("/categories");
};

const categoryIdGet = async (req, res) => {
  const category = await db.getCategoryById(req.params.id);
  const clothes = await db.getClothesForCategory(req.params.id);
  res.render("categorypage", { category: category[0], clothes: clothes });
};

module.exports = { categoryCreateGet, categoryCreatePost, categoryIdGet };
