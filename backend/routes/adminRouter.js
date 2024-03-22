const express = require("express");
const zod = require("zod");
const { User, Application, Admin, Scheme } = require("../database");

const adminRouter = express.Router();

const signInAuth = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const deleteApplicationAuth = zod.object({
    username: zod.string(),
    schemeId: zod.string(),
})

const deleteSchemeAuth = zod.object({
    schemeId: zod.string()
})

const userAcc = zod.object({
    username: zod.string()
})

const applicationAuth = zod.object({
    username: zod.string().email(),
    schemeId: zod.string(),
})

const schemeAuth = zod.object({
    schemeName: zod.string(),
    schemeId: zod.string(),
    minAge: zod.number().gt(0),
    gender: zod.string(),
    areaOfResidence: zod.string(),
    annualIncome: zod.number(),
})

adminRouter.post("/signin", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = signInAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.status(411).json({
            message: "Error logging in. Try again"
        })
    }
    
    if (await Admin.findOne({username: req.body.username, password: req.body.password})) {
        return res.status(200).json({
            message: "Sign in successful"
        })
    }
    return res.status(411).json({
        message: "Error while logging in"
    })
})

adminRouter.post("/addScheme", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = schemeAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.status(411).json({
            message: "Error adding scheme"
        })
    }

    if (await Scheme.findOne({schemeId: inputPayload.schemeId})) {
        return res.status(200).json({
            message: "Scheme already in database"
        })
    }

    const newScheme = await Scheme.create({
        schemeName: req.body.schemeName,
        schemeId: req.body.schemeId,
        minAge: req.body.minAge,
        gender: req.body.gender,
        areaOfResidence: req.body.areaOfResidence,
        annualIncome: req.body.annualIncome,
    })

    res.json({
        message: "Scheme added successfully"
    })
})

adminRouter.put("/approveAccount", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = userAcc.parse(inputPayload);
    if (!inputPayload) {
        return res.status(411).json({
            message: "Internal error"
        })
    }

    const user = await User.findOne({username : req.body.username});
    user.approved = true;
    user.save();
    return res.status(200).json({
        message: "User approved successfully"
    })
})

adminRouter.put("/approveApplication", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = applicationAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.status(411).json({
            message: "Incorrect inputs. Try again"
        })
    }
    try {
        const application = await Application.findOne({username: req.body.username, schemeId : req.body.schemeId});
        application.approved = true;
        application.save();
        
        return res.status(200).json({
            message: "Application approved successfully"
        })
    }
    catch {
        return res.json({
            message: "Error submitting application"
        })
    }
})

adminRouter.delete("/deleteScheme", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = deleteSchemeAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.json({
            message: "Invalid inputs"
        })
    }

    if (await Scheme.findOne({schemeId: inputPayload.schemeId})) {
        try {
            const response = await Scheme.deleteOne({schemeId: inputPayload.schemeId});
            return res.json({
                message: "Scheme deleted succesfully"
            })
        }
        catch(e) {
            return res.json({
                message: e
            })
        } 
    } else {
        return res.json({
            message: "Scheme not found"
        })
    }
})

adminRouter.delete("/deleteApplication", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = deleteApplicationAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.json({
            message: "Invalid inputs"
        })
    }

    if (await Application.findOne({username: inputPayload.username, schemeId: inputPayload.schemeId})) {
        try {
            const response = await Application.deleteOne({username: inputPayload.username, schemeId: inputPayload.schemeId})
            return res.json({
                message: "Application rejected"
            })
        } catch (e) {
            return res.json({
                message: e
            })
        }
    }
})

module.exports = adminRouter;