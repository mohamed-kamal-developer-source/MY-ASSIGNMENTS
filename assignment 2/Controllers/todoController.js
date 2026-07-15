const client = require("../pg");
const asyncErrorHandeler = require("../Utils/asyncErrorHandeler");
const customError = require("../Utils/customError");
const response = require("../Utils/response");
const validationData = require("../Utils/validation");

exports.getAllTasks = asyncErrorHandeler(async (req, res, next) => {
  const query = `SELECT * FROM tasks`;

  const tasks = await client.query(query);

  response(res, 200, { tasks: tasks.rows });
});

exports.creatTask = asyncErrorHandeler(async (req, res, next) => {
  const task = req.body.task;

  validationData(task);

  const query = `
    INSERT INTO tasks
    (task)
    VALUES ($1)`;

  const Task = await client.query(query, [task]);

  if (!Task) {
    return new customError("task not created. please try again", 400);
  }

  response(res, 201, { message: "task created successfully" });
});

exports.updateTask = asyncErrorHandeler(async (req, res, next) => {
  const taskId = req.params.id;

  const newTask = req.body.task;

  validationData(taskId);

  const query = `
  UPDATE tasks 
  SET task = $1
  WHERE id = $2
  `;

  const values = [newTask, taskId];

  const task = await client.query(query, [values]);

  if (!task) {
    return new customError("task not found", 404);
  }

  response(res, 200, { task: task.rows[0] });
});

exports.deleteTask = asyncErrorHandeler(async (req, res, next) => {
  const taskId = req.params.id;

  validationData(taskId);

  const query = `
  DELETE FROM tasks 
  WHERE id = $1`;

  const task = await client.query(query, [taskId]);

  if (!task) {
    return new customError("task not found", 404);
  }

  response(res, 200, { message: "task deleted successfully" });
});

