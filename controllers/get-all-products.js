import Product from "../models/product.js";

const getAllProducts = async (req, res, next) => {
  const { name, company, featured, sort, fields } = req.query;

  //Empty object which then assigned key value pairs
  const queryObject = {};

  //assigning key value pairs if the property is in the req body
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
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    result = result.select(fields.split(",").join(" "));
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  return res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

export default getAllProducts;
