const db = require("../db/queries");
const cloudinary = require("../utils/cloudinary");

const clothingCreateGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("clothingform", { title: "Add Clothing", categories: categories });
};

const clothingCreatePost = (req, res) => {
  console.log(req.body);

  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    const { name, colour, size, stock, category } = req.body;
    const image_url = result.url;
    db.createClothing(name, colour, size, stock, image_url, category);

    res.redirect("/clothes");
  });
};

const clothingIdGet = async (req, res) => {
  const clothing = await db.getClothingById(req.params.id);
  const categories = await db.getCategoriesForClothing(req.params.id);
  res.render("clothingpage", { item: clothing[0], categories: categories });
};

const clothingDeletePost = async (req, res) => {
  await db.deleteClothing(req.params.id);
  res.redirect("/clothes");
};

const clothingEditGet = async (req, res) => {
  const clothing = await db.getClothingById(req.params.id);
  const categories = await db.getAllCategories();
  const clothing_categories = await db.getCategoriesForClothing(req.params.id);

  res.render("editclothingpage", {
    title: "Edit Clothing",
    clothing: clothing[0],
    categories: categories,
    clothing_categories: clothing_categories,
  });
};

const clothingEditPost = async (req, res) => {
  console.log(req);
  console.log(req.params);
  res.redirect("/clothes");
};

module.exports = {
  clothingCreateGet,
  clothingCreatePost,
  clothingIdGet,
  clothingDeletePost,
  clothingEditGet,
  clothingEditPost,
};
