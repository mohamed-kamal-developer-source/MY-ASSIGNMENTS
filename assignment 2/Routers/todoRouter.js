const express = require("express");
const router = express.Router();

const todoController = require("../Controllers/todoController");
const { model } = require("mongoose");

router
  .route("/")
  .get(todoController.getAllTasks)
  .post(todoController.creatTask);

router
  .route("/:id")
  .patch(todoController.updateTask)
  .delete(todoController.deleteTask);

module.exports = router;
