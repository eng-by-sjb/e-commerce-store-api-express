import Product from "../models/product.js";

const getAllProducts = async (req, res, next) => {
  const {
    _id,
    name,
    price,
    company,
    featured,
    rating,
    sort,
    limit,
    fields,
    skip,
  } = req.query;

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
  if (limit) {
    result = result.limit(Number(limit));
  }
  if (fields) {
    result = result.select(fields.split(",").join(" "));
  }
  if (skip) {
    result = result.skip(Number(skip));
  }

  const products = await result;

  return res
    .status(200)
    .json({ success: true, nbHits: products.length, data: products });
};

export default getAllProducts;
