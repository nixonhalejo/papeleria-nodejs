import { Router } from "express";
import * as productsController from "../controllers/products.controller.js";
import { fakeAuth } from "../middlewares/auth.js";

export const productsRouter = Router();

productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.getById);
productsRouter.post("/", fakeAuth, productsController.create);
productsRouter.put("/:id", fakeAuth, productsController.update);
productsRouter.delete("/:id", fakeAuth, productsController.remove);