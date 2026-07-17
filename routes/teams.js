const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teams");
const validateTeam = require("../middleware/validateTeams");

router.get("/", teamsController.getAllTeams);
router.get("/:id", teamsController.getSingleTeam);

router.post("/", validateTeam, teamsController.createTeam);
router.put("/:id", validateTeam, teamsController.updateTeam);

router.delete("/:id", teamsController.deleteTeam);

module.exports = router;