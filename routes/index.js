const router = require("express").Router();

// Home route
router.get("/", (req, res) => {
  res.status(200).send("Library API");
});

// Routes
router.use("/books", require("./books"));
router.use("/teams", require("./teams"));

module.exports = router;