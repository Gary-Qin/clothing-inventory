const { Router } = require("express");
const clothingController = require("../controllers/clothingController");
const clothingRouter = Router();
const upload = require("../middleware/multer");

clothingRouter.get("/create", clothingController.clothingCreateGet);
clothingRouter.post(
  "/create",
  upload.single("image"),
  clothingController.clothingCreatePost
);
clothingRouter.get("/:id", clothingController.clothingIdGet);

module.exports = clothingRouter;
