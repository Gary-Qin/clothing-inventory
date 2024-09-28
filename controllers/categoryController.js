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

const categoryDeletePost = async (req, res) => {
  await db.deleteCategory(req.params.id);
  res.redirect("/categories");
};

const categoryEditGet = async (req, res) => {
  const category = await db.getCategoryById(req.params.id);
  res.render("editcategorypage", {
    title: "Edit Category",
    category: category[0],
  });
};

const categoryEditPost = async (req, res) => {
  await db.updateCategory(req.body.category, req.params.id);
  res.redirect("/categories");
};

module.exports = {
  categoryCreateGet,
  categoryCreatePost,
  categoryIdGet,
  categoryDeletePost,
  categoryEditGet,
  categoryEditPost,
};
