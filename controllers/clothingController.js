const db = require("../db/queries");

const clothingCreateGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("clothingform", { title: "Add Clothing", categories: categories });
};

const clothingCreatePost = (req, res) => {
  console.log(req.body);
  res.redirect("/clothes");
};

const clothingIdGet = async (req, res) => {
  const clothing = await db.getClothingById(req.params.id);
  const categories = await db.getCategoriesForClothing(req.params.id);
  console.log(clothing);
  console.log();
  console.log(categories);
  console.log();
  console.log();
  res.send(`logged clothing with id ${req.params.id} and its categories`);
};

module.exports = { clothingCreateGet, clothingCreatePost, clothingIdGet };
