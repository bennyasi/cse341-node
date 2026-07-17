const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one contact
const getSingle = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID." });
    }

    const contact = await mongodb
      .getDb()
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .insertOne(contact);

    res.status(201).json({
      message: "Contact created successfully.",
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID." });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .replaceOne(
        { _id: new ObjectId(id) },
        contact
      );

    if (response.modifiedCount > 0) {
      return res.sendStatus(204);
    }

    res.status(404).json({ message: "Contact not found." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID." });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount > 0) {
      return res.sendStatus(204);
    }

    res.status(404).json({ message: "Contact not found." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};