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
    SELECT categories.id, categories.category 
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

async function createCategory(name) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [name]);
}

async function findCategoryIDs(categories) {
  const ids = [];

  await Promise.all(
    (categories || []).map(async (category) => {
      const { rows } = await pool.query(
        `SELECT categories.id FROM categories WHERE categories.category = ($1);`,
        [category]
      );
      ids.push(rows[0].id);
    })
  );

  return ids;
}

async function createClothing(name, colour, size, stock, image_url, category) {
  await pool.query(
    "INSERT INTO clothing (name, colour, size, stock, image_url) VALUES ($1, $2, $3, $4, $5);",
    [name, colour, size, stock, image_url]
  );

  const { rows } = await pool.query(
    "SELECT clothing.id FROM clothing WHERE clothing.image_url = $1;",
    [image_url]
  );
  const clothingID = rows[0].id;
  const categoryIDs =
    typeof category == "string"
      ? await findCategoryIDs([category])
      : await findCategoryIDs(category);

  categoryIDs.forEach(async (categoryID) => {
    await pool.query(
      "INSERT INTO clothing_categories (clothing_id, category_id) VALUES ($1, $2);",
      [clothingID, categoryID]
    );
  });
}

async function deleteCategory(cid) {
  await pool.query(
    "DELETE FROM clothing_categories WHERE category_id = ($1);",
    [cid]
  );
  await pool.query("DELETE FROM categories WHERE id = ($1);", [cid]);
}

async function deleteClothing(cid) {
  await pool.query(
    "DELETE FROM clothing_categories WHERE clothing_id = ($1);",
    [cid]
  );
  await pool.query("DELETE FROM clothing WHERE id = ($1);", [cid]);
}

async function updateCategory(name, cid) {
  await pool.query("UPDATE categories SET category = ($1) WHERE id = ($2);", [
    name,
    cid,
  ]);
}

async function updateClothing() {}

module.exports = {
  getAllClothes,
  getAllCategories,
  getClothingById,
  getCategoryById,
  getCategoriesForClothing,
  getClothesForCategory,
  createCategory,
  createClothing,
  deleteCategory,
  deleteClothing,
  updateCategory,
};
