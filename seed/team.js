const { Team } = require("../models/team_model");
const mongoose = require("mongoose");
const db = require("../config/staging_env.json");

const data = [
  {
    id: "1",
    name: "test1",
    email: "test1@ibm.com",
    role: "Project Manager",
    password: "test1#",
  },
  {
    id: "2",
    name: "test2",
    email: "test2@ibm.com",
    role: "Backend Engineer",
    password: "test2#",
  },
  {
    id: "3",
    name: "test3",
    email: "test3@ibm.com",
    role: "DevOps Engineer",
    password: "test3#",
  },
  {
    id: "4",
    name: "test4",
    email: "tes4@ibm.com",
    role: "UX Design",
    password: "test4#",
  },
];

function connectDB() {
  mongoose
    .connect(`mongodb://localhost/${db.testing_db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db.testing_db} database`))
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
      password: member.password,
    }).save();

    await Team.insertMany(member);
  }

  mongoose.disconnect();

  console.info("Done!");
  console.info("Team DB table sucessfully populated!");
}

seed();
