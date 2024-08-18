const pool = require("./pool");

async function getAllClothes() {
  const { rows } = await pool.query("SELECT * FROM clothing");
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getClothingById(cid) {
  const { rows } = await pool.query(
    "SELECT * FROM clothing WHERE clothing.id = ($1)",
    [cid]
  );
  return rows;
}

async function getCategoryById(cid) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE categories.id = ($1)",
    [cid]
  );
  return rows;
}

async function getCategoriesForClothing(cid) {
  const { rows } = await pool.query(
    `
    SELECT categories.category 
    FROM clothing
    JOIN clothing_categories ON clothing.id = clothing_categories.clothing_id
    JOIN categories ON clothing_categories.category_id = categories.id
    WHERE clothing.id = ($1);
  `,
    [cid]
  );
  return rows;
}

async function getClothesForCategory(cid) {
  const { rows } = await pool.query(
    `
    SELECT clothing.*
    FROM categories
    JOIN clothing_categories ON categories.id = clothing_categories.category_id
    JOIN clothing ON clothing_categories.clothing_id = clothing.id
    WHERE categories.id = ($1);
  `,
    [cid]
  );
  return rows;
}

module.exports = {
  getAllClothes,
  getAllCategories,
  getClothingById,
  getCategoryById,
  getCategoriesForClothing,
  getClothesForCategory,
};
