const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all teams
const getAllTeams = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("teams").find();
    const teams = await result.toArray();

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one team
const getSingleTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);

    const db = mongodb.getDatabase();
    const result = await db.collection("teams").find({ _id: teamId });
    const team = await result.toArray();

    if (team.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST team
const createTeam = async (req, res) => {
  try {
    const team = {
      name: req.body.name,
      department: req.body.department,
      leader: req.body.leader,
      email: req.body.email,
      members: req.body.members
    };

    const db = mongodb.getDatabase();
    const response = await db.collection("teams").insertOne(team);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: "Failed to create team." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT team
const updateTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);

    const team = {
      name: req.body.name,
      department: req.body.department,
      leader: req.body.leader,
      email: req.body.email,
      members: req.body.members
    };

    const db = mongodb.getDatabase();
    const response = await db
      .collection("teams")
      .replaceOne({ _id: teamId }, team);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Team not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE team
const deleteTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);

    const db = mongodb.getDatabase();
    const response = await db.collection("teams").deleteOne({ _id: teamId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Team deleted successfully." });
    } else {
      res.status(404).json({ message: "Team not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
  updateTeam,
  deleteTeam
};