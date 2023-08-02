const notFoundHandler = (req, res, next) => {
  res.status(404).send(`Route does not exit`);
};
export { notFoundHandler };
