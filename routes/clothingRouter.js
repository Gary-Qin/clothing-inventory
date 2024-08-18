const { Router } = require("express");
const clothingController = require("../controllers/clothingController");
const clothingRouter = Router();

clothingRouter.get("/create", clothingController.clothingCreateGet);
clothingRouter.post("/create", clothingController.clothingCreatePost);
clothingRouter.get("/:id", clothingController.clothingIdGet);

module.exports = clothingRouter;
