//utils
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");

//model
const { Roles, validate } = require("../models/team_roles_model");

const router = express.Router();

/*
 * returns all roles from DB
 */
router.get("/", async (req, res) => {
  const roles = await Roles.find().select("-__v").sort("name");
  if (!roles) return res.status(404).send("Roles could not be found");

  res.send(roles);
});

module.exports = router;
