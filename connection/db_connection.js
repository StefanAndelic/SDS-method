//utils
const staging = require("../config/staging_env.json");

const mongoose = require("mongoose");

function db() {
  mongoose
    .connect(`mongodb://localhost/${staging.testing_db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${staging.testing_db} database`))
    .catch((err) => error("Could not connect to DB...Please try again"));
}
module.exports = db;
