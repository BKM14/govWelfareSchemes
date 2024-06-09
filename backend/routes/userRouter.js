const express = require("express");
const zod = require("zod");
const { User, Application, Scheme } = require("../database");

const userRouter = express.Router();

const signUpAuth = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    birthDay: zod.string(),
    birthMonth: zod.string(),
    birthYear: zod.string(),
    areaOfResidence: zod.string(),
    gender: zod.string(),
})

const signInAuth = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const applyAuth = zod.object({
    username : zod.string().email(),
    schemeId: zod.string()
})

userRouter.post("/create", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = signUpAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    if (await User.findOne({
        username: req.body.username    
    })) {
        return res.json({
            message: "Account already exists. Sign in"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        birthDay: req.body.birthDay,
        birthMonth: req.body.birthMonth,
        birthYear: req.body.birthYear,
        areaOfResidence: req.body.areaOfResidence,
        gender: req.body.gender,
        approved: false
    })

    return res.json({
        message: "Signup successful. You can sign in now"
    })
})

userRouter.post("/signin", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = signInAuth.parse(inputPayload);
    if (!parsedPayload) {
        return res.json({
            message: "Error while logging in. Try again"
        })
    }
    
    if (await User.findOne({username: req.body.username, password: req.body.password})) {
        return res.status(200).json({
            message: "login successful"
        });
    }
    return res.json({message : "Error while logging in"})
})

userRouter.post("/apply", async (req, res) => {
    const inputPayload = req.body;
    const parsedPayload = applyAuth.parse(inputPayload);
    if (!parsedPayload) {
          return res.json({
            message: "Error applying to the scheme"
        })
    }

    if (await User.findOne({username: inputPayload.username})) {
        if (await Scheme.findOne({schemeId: inputPayload.schemeId})) {
            try {
                const application = await Application.create({
                    username: parsedPayload.username,
                    schemeId: parsedPayload.schemeId,
                    approved: false
                })
                return res.status(200).json({
                    message: "Application submitted"
                })
            } catch (e) {
                return res.json({message: e});
            }
        }
        return res.json({
            message: "Scheme not found"
        }) 
    } else {
        return res.json({
            message: "User not found"
        })
    } 
})

userRouter.get("/unApprovedUsers", async(req, res) => {
    try {
        const result = await User.find({'approved': false});
        return res.json(result);
    } catch (e) {   
        return res.json(e);
    }
})

module.exports = userRouter;