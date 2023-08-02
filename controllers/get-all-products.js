const getAllProducts = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, message: `working` });
  } catch (error) {
    return next(error);
  }
};

export default getAllProducts;
