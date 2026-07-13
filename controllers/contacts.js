const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// GET all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection("contacts")
      .find();

    const contacts = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET single contact
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection("contacts")
      .find({ _id: contactId });

    const contact = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact[0]);
  } catch (err) {
    res.status(500).json(err);
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

    if (response.acknowledged) {
      res.status(201).json({
        id: response.insertedId
      });
    } else {
      res.status(500).json("Failed to create contact.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT update contact
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
      .getDb()
      .collection("contacts")
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(500).json("Failed to update contact.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(500).json("Failed to delete contact.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};