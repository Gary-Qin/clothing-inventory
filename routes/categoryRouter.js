const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/create", categoryController.categoryCreateGet);
categoryRouter.post("/create", categoryController.categoryCreatePost);
categoryRouter.get("/:id", categoryController.categoryIdGet);
categoryRouter.post("/:id", categoryController.categoryDeletePost);
categoryRouter.get("/:id/edit", categoryController.categoryEditGet);
categoryRouter.post("/:id/edit", categoryController.categoryEditPost);

module.exports = categoryRouter;
