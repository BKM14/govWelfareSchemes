const express = require("express");
const { Scheme } = require("../database");

const schemeRouter = express.Router();

schemeRouter.get("/schemes", async (req, res) => {
    const schemes = await Scheme.find();
    return res.json(schemes);
})

module.exports = schemeRouter