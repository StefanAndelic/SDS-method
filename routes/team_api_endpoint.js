//utils
const express = require("express");

//model
const { Team } = require("../models/team_model");

const router = express.Router();

/*
 * returns all members from DB
 */
router.get("/", async (req, res) => {
  const member = await Team.find().select("-__v").sort("name");
  if (!member) return res.status(404).send("Team members could not be found");

  res.send(member);
});

module.exports = router;
