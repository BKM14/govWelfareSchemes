const express = require("express");
const adminRouter = require("./adminRouter");
const userRouter = require("./userRouter");
const schemeRouter = require("./schemeRouter");
const applicationRouter = require("./applicationRouter");



const router = express.Router();
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/schemes", schemeRouter);
router.use("/application", applicationRouter)

module.exports = router;