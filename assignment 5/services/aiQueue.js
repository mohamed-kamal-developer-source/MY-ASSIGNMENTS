const { Queue } = require("bullmq");
const redis = require("../redis");

const aiQueue = new Queue("ai-jobs", {
  connection: redis,
});

module.exports = aiQueue;
