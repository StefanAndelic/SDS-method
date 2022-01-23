const { Member } = require("../models/team_model");
const mongoose = require("mongoose");
const db = require("../config/staging_env.json");

const data = [
  {
    firstName: "Stefan",
    lastName: "Andelic",
    email: "admin@hotmail.com",
    password: "admin8",
    role: "Project Manager",
  },
];

async function seed() {
  await mongoose.connect(`mongodb://localhost/${db.testing_db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Member.deleteMany({});

  for (let member of data) {
    const member_object = await new Member({
      firstName: member.name,
      email: member.email,
      password: member.password,
      role: member.role,
    }).save();

    await Member.insertMany(member);
  }

  mongoose.disconnect();

  console.info("Done!");
  console.info("Team DB table sucessfully populated!");
}

seed();
