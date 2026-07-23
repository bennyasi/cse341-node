const home = (req, res) => {
  res.status(200).json({
    message: "Welcome to the Library API",
    endpoints: {
      books: "/books",
      teams: "/teams",
      documentation: "/api-docs"
    }
  });
};

module.exports = {
  home
};