const express = require("express");
const { Application } = require("../database");

const applicationRouter = express.Router();

applicationRouter.get("/unApprovedApplications", async (req, res) => {
    const applications = await Application.find({approved: false});
    return res.json(applications);
})

module.exports = applicationRouter;