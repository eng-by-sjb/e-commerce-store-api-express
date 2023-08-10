import Product from "../models/product.js";

const getAllProducts = async (req, res, next) => {
  const { name, company, featured, sort, fields, numericFilters } = req.query;

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

  //numeric filters
  if (numericFilters) {
    const operatorMapping = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };

    const regEx = /\b(<|>|>=|<=|=)\b/g;

    let filters = numericFilters.replace(regEx, (match) => {
      return `-${operatorMapping[match]}-`;
    });

    const options = ["price", "rating"];

    filters = filters.split(",").forEach((element) => {
      const [field, operator, value] = element.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log(queryObject);
  }

  let result = Product.find(queryObject);

  // sort is only added if sort is queried.
  if (sort) {
    result = result.sort(sort.split(",").join(" "));
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
