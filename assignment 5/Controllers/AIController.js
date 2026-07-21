const asyncErrorHandeler = require("../Utils/asyncErrorHandeler");
const customError = require("../Utils/customError");
const response = require("../Utils/response");
const validationData = require("../Utils/validation");

const queue = require("../services/aiQueue");

const jobRepo = require("../services/jobRepo");

exports.message = asyncErrorHandeler(async (req, res, next) => {
  const message = req.body.message;

  validationData(message);


  const jobId = await jobRepo.createJob(message);

  await queue.add(jobId);

  response(res, 202, { message: "accepted" });
});

exports.result = asyncErrorHandeler(async (req, res, next) => {
  const jobId = req.params.id;

  validationData(message);

  const job = await jobRepo.getJobById(jobId);

  response(res, 200, { job: job });
});
