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


module.exports = {
  getAllContacts,
  getContactById
};