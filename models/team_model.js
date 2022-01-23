const Joi = require("joi");
const mongoose = require("mongoose");
//creating a model
const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

/*
 * model validation schema
 */
function validateMember(member) {
  const schema = Joi.object({
    id: Joi.string().min(5).max(50),
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50),
    role: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(member);
}

exports.Team = Team;
exports.validateMember = validateMember;
