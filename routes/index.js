const router = require("express").Router();

// Home route
router.get("/", (req, res) => {
  res.status(200).send("Contacts API");
});

// Contacts routes
router.use("/contacts", require("./contacts"));

module.exports = router;