//utils
const express = require("express");
const { eq } = require("lodash");
const { Mongoose } = require("mongoose");

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

/*
 * posts a user to the db
 */
router.post("/", (req, res, next) => {
  const member = new Team({
    id: req.body.id,
    name: req.body.name,
    role: req.body.role,
    email: req.body.email
  });
  member.save().then(result =>{
    console.log(result)
  })
  .catch(err => console.log(err));
  res.status(201).json({
    message: 'Handling POST requests to /team',
    createdMember: member
  })
});

/*
 * deletes a user from the db
 */
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Team.deleteMany({id: id })
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;
