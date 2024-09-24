const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/create", categoryController.categoryCreateGet);
categoryRouter.post("/create", categoryController.categoryCreatePost);
categoryRouter.get("/:id", categoryController.categoryIdGet);
categoryRouter.post("/:id", categoryController.categoryDeletePost);

module.exports = categoryRouter;
