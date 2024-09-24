#! /usr/bin/env node
require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS clothing (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  colour VARCHAR ( 31 ),
  size VARCHAR ( 31 ),
  stock INT,
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
  ('Cropped T-Shirt', 'Black', 'M', 47, 'https://res.cloudinary.com/drni8lcp2/image/upload/v1724726456/pxe3prs0g4jmyintwxsb.jpg'),
  ('Drop Shoulder T-Shirt', 'Brown', 'L', 23, 'https://res.cloudinary.com/drni8lcp2/image/upload/v1724726435/fnqi3fsouc2dcis9dxl5.jpg'),
  ('Oversized Hoodie', 'Slate', 'M', 29, 'https://res.cloudinary.com/drni8lcp2/image/upload/v1724726451/p76ifzrnfxjlawt8zgoa.jpg'),
  ('Baggy Sweatpants', 'Gray', 'S', 18, 'https://res.cloudinary.com/drni8lcp2/image/upload/v1724726465/te4onoxnjgxb1o7qwj30.jpg'),
  ('Cargo Sweatshorts', 'Slate', 'S', 51, 'https://res.cloudinary.com/drni8lcp2/image/upload/v1724726460/ek0j4mcy42ztribtkwge.jpg');

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
  (4, 4), (4, 5),  -- Baggy Sweatpants belongs to Bottoms and Pants
  (5, 4), (5, 6);  -- Cargo Sweatshorts belongs to Bottoms and Shorts
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
