const notFound = (req, res) => {
  res.status(404).json({ message: "404 Not found" });
};

export default notFound;
