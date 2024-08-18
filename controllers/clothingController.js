const db = require("../db/queries");

const clothingCreateGet = (req, res) => {
  res.send("create clothing page");
};

const clothingCreatePost = (req, res) => {
  res.send("clothing created");
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
