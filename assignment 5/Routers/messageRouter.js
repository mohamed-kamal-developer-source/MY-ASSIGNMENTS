const express = require("express");
const router = express.Router();
const AIController = require("../Controllers/AIController");

router.route("/").post(AIController.message);
router.route("/jobs/:id").get(AIController.result);

module.exports = router;
