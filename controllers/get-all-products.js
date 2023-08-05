import Product from "../models/product.js";

const getAllProducts = async (req, res, next) => {
  const { _id, name, price, company, featured, rating, sort, limit } =
    req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject);

  // sort is only added if sort is queried.
  if (sort) {
    result = result.sort(sort.split(",").join(" "));
    // result = result.sort(sort.replaceAll(",", " "));
  }
  if (limit) {
    result = result.limit(Number(limit));
  }

  const products = await result;

  return res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

export default getAllProducts;
