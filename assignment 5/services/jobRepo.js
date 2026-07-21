const client = require("../pg");
const customError = require("../Utils/customError");

exports.createJob = async (input) => {

  const query = `
    INSERT INTO jobs
    (input,status)
    VALUES ($1,'queued')
    RETURNING id`;

  const job = await client.query(query, [input]);

  if (!job.rowCount) {
    throw new customError("no job created", 404);
  }

  return job.rows[0].id;
};

exports.getJobById = async (jobId) => {
  const query = `
    SELECT * FROM jobs
    WHERE id = $1
    AND status = 'pending'`;

  const job = await client.query(query, [jobId]);

  if (!job.rowCount) {
    throw new customError("no job found", 404);
  }

  return job.rows[0];
};

exports.updateStatus = async (jobId, status) => {
  const query = `
    UPDATE jobs
    SET status = $1
    WHERE id = $2`;

  const job = await client.query(query, [status, jobId]);

  if (!job.rowCount) {
    throw new customError("no job found", 404);
  }
};

exports.saveResult = async (jobId, res) => {
  const query = `
    UPDATE jobs
    SET result = $1,
    status = 'completed'
    WHERE id = $2`;

  const job = await client.query(query, [res, jobId]);

  if (!job.rowCount) {
    throw new customError("no job found", 404);
  }
};
