import Product from "../models/product.js";

const getAllProductsStatic = async (req, res, next) => {
  if (Object.keys(req.query).length) {
    const products = await Product.find(req.query);
    return res
      .status(200)
      .json({ success: true, nbHits: products.length, data: products });
  }

  const products = await Product.find();
  return res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

export { getAllProductsStatic };
