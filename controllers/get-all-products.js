import Product from "../models/product.js";

const getAllProducts = async (req, res, next) => {
  const { _id, name, price, company, featured, rating } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  const products = await Product.find(queryObject);

  return res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });

  // if (Object.keys(req.query).length) {
  //   const products = await Product.find(req.query);
  //   return res
  //     .status(200)
  //     .json({ success: true, nbHits: products.length, data: products });
  // }

  // const products = await Product.find();
  // return res
  //   .status(200)
  //   .json({ success: true, nbHits: products.length, data: products });
};

export default getAllProducts;
