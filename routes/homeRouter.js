const { Router } = require("express");
const homeController = require("../controllers/homeController");
const categoryRouter = require("./categoryRouter");
const clothingRouter = require("./clothingRouter");
const homeRouter = Router();

homeRouter.get("/", homeController.homePageGet);
homeRouter.get("/categories", homeController.categoriesPageGet);
homeRouter.get("/clothes", homeController.clothesPageGet);

homeRouter.use("/category", categoryRouter);
homeRouter.use("/clothing", clothingRouter);

module.exports = homeRouter;
