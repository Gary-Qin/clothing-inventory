const db = require("../db/queries");

const homePageGet = (req, res) => {
  res.render("home", { title: "Home" });
};

const categoriesPageGet = async (req, res) => {
  const categories = await db.getAllCategories();
  console.log("Categories: ", categories);
  res.render("categories", { title: "Categories" });
};

const clothesPageGet = async (req, res) => {
  const clothes = await db.getAllClothes();
  console.log("Clothes: ", clothes);
  res.render("clothes", { title: "Clothes" });
};

module.exports = { homePageGet, categoriesPageGet, clothesPageGet };
