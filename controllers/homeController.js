const db = require("../db/queries");

const homePageGet = (req, res) => {
  res.render("home", { title: "Home" });
};

const categoriesPageGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { title: "Categories", categories: categories });
};

const clothesPageGet = async (req, res) => {
  const clothes = await db.getAllClothes();
  res.render("clothes", { title: "Clothes", clothes: clothes });
};

module.exports = { homePageGet, categoriesPageGet, clothesPageGet };
