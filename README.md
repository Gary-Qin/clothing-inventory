# Clothing Inventory
> A barebones clothing inventory management web app with full CRUD functionality.

> Made with Express.js, PostgreSQL, Cloudinary, and EJS.

***

# Set-up

Clone the repo and install dependencies using `npm`
```
> npm install
```
- Make sure you have [PostgreSQL](https://www.postgresql.org/download/) installed and running before attempting to locally host this app!
- Also make sure to have a [Cloudinary](https://cloudinary.com/) account, as it's used to store user inputted images on the cloud.

Create a PostgreSQL database, and then create a local .env file to store the following:
```
LOCALHOST=3000
HOST="localhost"
ROLE_NAME=<YOUR POSTGRESQL ROLE NAME HERE>
DATABASE=<YOUR POSTGRES DB NAME HERE>
PASSWORD=<YOUR POSTGRESQL PASSWORD HERE>
PORT=5432
CLOUDINARY_CLOUD_NAME=<YOUR CLOUDINARY CLOUD NAME HERE>
CLOUDINARY_API_KEY=<YOUR CLOUDINARY API KEY HERE>
CLOUDINARY_SECRET_KEY=<YOUR CLOUDINARY SECRET KEY HERE>
```

Populate the database you've created by running the following:
```
> node db/populatedb.js
```

Run the app with:
```
> node --watch app.js
```


***
# Preview

![image](https://github.com/user-attachments/assets/57dfe3a7-5aca-4a2f-880e-0175cc9e423f)

![image](https://github.com/user-attachments/assets/20857c78-6af2-4879-be40-4e569c651939)
