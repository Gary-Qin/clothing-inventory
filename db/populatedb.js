#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS clothing (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  colour VARCHAR ( 31 ),
  size VARCHAR ( 31 ),
  stock SMALLINT,
  image_url VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS clothing_categories (
  clothing_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (clothing_id) REFERENCES clothing (id),
  FOREIGN KEY (category_id) REFERENCES categories (id),
  PRIMARY KEY (clothing_id, category_id)
);

INSERT INTO clothing (name, colour, size, stock, image_url) 
VALUES
  ('Cropped T-Shirt', 'Black', 'M', 47, 'cropped-tshirt.jpg'),
  ('Drop Shoulder T-Shirt', 'Brown', 'L', 23, 'drop-shoulder-tshirt.jpg'),
  ('Oversized Hoodie', 'Slate', 'M', 29, 'oversized-hoodie.jpg'),
  ('Baggy Sweatpants', 'Gray', 'S', 18, 'baggy-sweatpants.jpg'),
  ('Cargo Sweatshorts', 'Slate', 'S', 51, 'cargo-sweatshorts.jpg');

INSERT INTO categories (category) 
VALUES
  ('Tops'),
  ('Hoodies'),
  ('Shirts'),
  ('Bottoms'),
  ('Pants'),
  ('Shorts');

INSERT INTO clothing_categories (clothing_id, category_id)
VALUES
  (1, 1), (1, 3),  -- Cropped T-Shirt belongs to Tops and Shirts
  (2, 1), (2, 3),  -- Drop Shoulder T-Shirt belongs to Tops and Shirts
  (3, 1), (3, 2),  -- Oversized Hoodie belongs to Tops and Hoodies
  (4, 4), (4, 5),  -- Baggy Sweatpants belongs to Shirts and Bottoms
  (5, 4), (5, 6);  -- Cargo Sweatshorts belongs to Bottoms and Pants
`;

async function main() {
  console.log("seeding...");

  const connection =
    "postgresql://" +
    process.env.USER +
    ":" +
    process.env.PASSWORD +
    "@" +
    process.env.HOST +
    ":" +
    process.env.PORT +
    "/" +
    process.env.DATABASE;
  const client = new Client({
    connectionString: connection,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
