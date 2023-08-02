const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ errorMessage: err.errorMessage });
};

export default errorHandler;
