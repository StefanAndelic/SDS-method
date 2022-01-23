const express = require("express");
const staging = require("./config/staging_env.json");

const login = require("./routes/login_endpoint");
const team = require("./routes/team_endpoint");
const team_roles = require("./routes/team_roles_endpoint");

const app = express();
app.use(express.json());

app.use("/api/v1/login", login);
app.use("/api/v1/members", team);
app.use("/api/v1/roles", team_roles);

//connects to the database
require("./connection/db_connection")();

//main
function start() {
  console.log(`Server started on port ${port}`);
}
const port = process.env.PORT || staging.port;
const server = app.listen(port, start);

module.exports = server;
