//utils
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");

//model
const { Team } = require("../models/team_model");

const router = express.Router();

/*
 * returns all members from DB
 */
router.get("/", async (req, res) => {
  const member = await Team.find().select("-__v").sort("name");
  if (!member) return res.status(404).send("Members could not be found");

  res.send(member);
});

/*
 * deletes a user based on ID
 */
router.delete("/:id", async (req, res) => {
  //query the DB by team_member ID
  const team_member = await Member.findByIdAndRemove(req.params.id);

  //if it doesn't exit throw an error
  if (!team_member) return res.status(404).send("Member not found in DB");

  res.send(team_member);
});

router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //event object
  let event_object = new Team({
    firstName: req.body.firstName,
    role: req.body.role,
    email: req.body.email,
  });

  //save the event to DB
  const event = await event_object.save();

  //send response;
  res.send(event);
});

module.exports = router;
