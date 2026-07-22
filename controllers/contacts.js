const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
      .getDatabase()
      .collection("contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({
        message: "Contact created successfully",
        id: response.insertedId
      });
    } else {
      res.status(500).json({ error: "Failed to create contact" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};