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

// GET single team
const getSingleTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);

    const db = mongodb.getDatabase();
    const result = await db.collection("teams").findOne({ _id: teamId });

    if (!result) {
      return res.status(404).json({ message: "Team not found." });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create team
const createTeam = async (req, res) => {
  try {
    const team = {
      teamName: req.body.teamName,
      city: req.body.city,
      coach: req.body.coach,
      captain: req.body.captain,
      founded: req.body.founded,
      stadium: req.body.stadium,
      championships: req.body.championships
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

// PUT update team
const updateTeam = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);

    const team = {
      teamName: req.body.teamName,
      city: req.body.city,
      coach: req.body.coach,
      captain: req.body.captain,
      founded: req.body.founded,
      stadium: req.body.stadium,
      championships: req.body.championships
    };

    const db = mongodb.getDatabase();
    const response = await db.collection("teams").replaceOne(
      { _id: teamId },
      team
    );

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
      res.status(204).send();
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