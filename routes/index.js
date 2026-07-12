const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Contacts API");
});

router.use("/contacts", require("./contacts"));

module.exports = router;