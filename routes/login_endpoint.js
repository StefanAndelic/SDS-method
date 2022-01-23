//utils
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const express = require("express");

//models
const { Member } = require("../models/team_model");

const router = express.Router();

/*
 * authenticates the user
 */
router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //query the databse for user's email
  let user = await Member.findOne({ email: req.body.email });
  //if the user does not exist show error
  if (!user) return res.status(400).send("Invalid email ");

  //compare the password from request with database
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  //if the password does not exist show error
  if (!validPassword) return res.status(400).send("Invalid password");

  //generate the token with JWT
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    },
    //token expiration
    "jwtPrivateKey",
    { expiresIn: 60 * 60 }
  );

  //send response
  res.send(token);
});

/*
 * response validation schema
 */
// function validate(req) {
//   const schema = {
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//   };

//   return Joi.validate(req, schema);
// }

exports.Member = Member;
module.exports = router;
