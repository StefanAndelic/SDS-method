const { Team } = require("../models/team_model");
const mongoose = require("mongoose");
const db = require("../config/staging_env.json");

const data = [
  {
    id: "1",
    name: "test1",
    email: "test1@ibm.com",
    role: "Project Manager",
  },
  {
    id: "2",
    name: "test2",
    email: "test2@ibm.com",
    role: "Backend Engineer",
  },
  {
    id: "3",
    name: "test3",
    email: "test3@ibm.com",
    role: "DevOps Engineer",
  },
  {
    id: "4",
    name: "test4",
    email: "tes4@ibm.com",
    role: "UX Design",
  },
];

function connectDB() {
  mongoose
    .connect(`mongodb://localhost/${db.testing_db2}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db.testing_db2} database`))
    .catch((err) => error("Could not connect to DB...Please try again"));
}

async function seed() {
  connectDB();

  await Team.deleteMany({});

  for (let member of data) {
    const member_object = await new Team({
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
    }).save();

    await Team.insertMany(member);
  }

  mongoose.disconnect();

  console.info("Done!");
  console.info("Team DB table sucessfully populated!");
}

seed();
