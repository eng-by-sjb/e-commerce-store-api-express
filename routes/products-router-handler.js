import express from "express";
import getAllProducts from "../controllers/get-all-products.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(
    `<h1>
  Products API
  </h1>
  <a href="/api/v1/products">
  products
  </a>
  `
  );
});
router.route("/api/v1/products").get(getAllProducts);

export { router as routerHandler };
