const AIService = require("./AIService");

const jobRepo = require("./jobRepo");

const redis = require("../redis");
const { Worker } = require("bullmq");

const worker = new Worker(
  "ai-jobs",
  async (job) => {
    try {
      const jobData = await jobRepo.getJobById(job);

      await jobRepo.updateStatus(job, "processing");

      const result = await AIService(jobData.input);

      await jobRepo.saveResult(job, result);
      
    } catch (err) {
      await jobRepo.updateStatus(job, "failed");
    }
  },
  {
    connection: redis,
  },
);
