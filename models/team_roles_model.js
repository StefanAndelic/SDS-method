const Joi = require("joi");
const mongoose = require("mongoose");

//creating a model
const Roles = mongoose.model(
  "Roles",
  new mongoose.Schema({
    id: {
      type: Number,
      // required: true,
      minlength: 5,
      maxlength: 255,
    },
    role_name: {
      type: String,
      // required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    role_description: {
      type: String,
      // required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

/*
 * model validation schema
 */
function validateRole(role) {
  const schema = Joi.object({
    id: Joi.string().min(5).max(50).required(),
    role_name: Joi.string().min(5).max(50).required(),
    role_description: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(role);
}

exports.Roles = Roles;
exports.validate = validateRole;
