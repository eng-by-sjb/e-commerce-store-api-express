import express from "express";
import { getAllProductsStatic } from "../controllers/get-all-products-static.js";
import getAllProducts from "../controllers/get-all-products.js";

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export { router as routerHandler };
