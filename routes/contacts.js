const router = require("express").Router();
const contactsController = require("../controllers/contacts");

// GET all contacts
router.get("/", contactsController.getAll);

// GET single contact
router.get("/:id", contactsController.getSingle);

// POST create a contact
router.post("/", contactsController.createContact);

// PUT update a contact
router.put("/:id", contactsController.updateContact);

// DELETE a contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;