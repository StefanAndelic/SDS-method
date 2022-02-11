//utils
const express = require("express");
const { OutputFileType } = require("typescript");

//model
const { Project } = require("../models/project_model");

const router = express.Router();

/*
 * returns all projects from DB
 */
router.get("/", async (req, res) => {
  const project = await Project.find().select("-__v").sort("phase");
  if (!project) return res.status(404).send("Project phases could not be found");

  res.send(project);
});

/*
 * posts a user to the db
 */
router.post("/", (req, res, next) => {
  const project = new Project({
    id: req.body.id,
    phase: req.body.phase,
    activity: req.body.activity,
    task: req.body.task,
    input: req.body.input,
    output: req.body.output
  });
  project.save().then(result =>{
    console.log(result)
  })
  .catch(err => console.log(err));
  res.status(201).json({
    message: 'Handling POST requests to /project',
    createdProject: project
  })
});


/*
 * deletes a project from the db
 */
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Project.deleteMany({id: id })
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;
