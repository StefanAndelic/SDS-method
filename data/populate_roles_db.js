const { Roles } = require("../models/team_roles_model");
const mongoose = require("mongoose");
const db = require("../config/staging_env.json");

const data = [
  {
    role_name: "Data Engineer",
    role_description: "Data Engineer",
  },
  {
    role_name: "Project Manager",
    role_description: "Project Manager",
  },
  {
    role_name: "Architect",
    role_description: "Architect",
  },
  {
    role: "Iteration Manager",
    role_description: "Iteration Manager",
  },
];

async function seed() {
  await mongoose.connect(`mongodb://localhost/${db.testing_db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Roles.deleteMany({});

  for (let member of data) {
    const member_object = await new Roles({
      role_name: member.role,
      description: member.role_description,
    }).save();

    await Roles.insertMany(member);
  }

  mongoose.disconnect();

  console.info("Done!");
  console.info("Roles table populated in test DB!");
}

seed();
