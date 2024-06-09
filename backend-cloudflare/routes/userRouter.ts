import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";
import zod from 'zod'

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}

type Variables = {
    username: string
}

const userRouter = new Hono<{Bindings: Bindings, Variables: Variables}>()

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

userRouter.post("/signin", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload = signInAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Error while logging in. Try again"
        }, 200);
    }
    
    if (await prisma.user.findFirst({where: {username: parsedPayload.username, password: parsedPayload.password}})) {
        const token = await Jwt.sign({username: parsedPayload.username}, c.env.JWT_SECRET);
        return c.json({
            message: "login successful",
            token: token
        }, 200);
    }

    return c.json({message : "Error while logging in"}, 200)
})

userRouter.post("/create", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload = signUpAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Incorrect inputs"
        })
    }

    if (await prisma.user.findFirst({ where: {
        username: parsedPayload.username    
    }})) {
        return c.json({
            message: "Account already exists. Sign in"
        }, 411)
    }

    await prisma.user.create({data: {
        username: parsedPayload.username,
        password: parsedPayload.password,
        name: parsedPayload.name,
        birthDay: parsedPayload.birthDay,
        birthMonth: parsedPayload.birthMonth,
        birthYear: parsedPayload.birthYear,
        areaOfResidence: parsedPayload.areaOfResidence,
        gender: parsedPayload.gender,
        approved: false
    }})

    const token = await Jwt.sign({username: parsedPayload.username}, c.env.JWT_SECRET)

    return c.json({
        message: "Signup successful. You can sign in now",
        token: token
    }, 200)
})

userRouter.use("/*", async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) {
      c.status(401);
      return c.text("Unauthorized");
    }

    const { username } = await Jwt.verify(token, c.env.JWT_SECRET) as { username: string };
    if (!username) {
      c.status(401);
      return c.json({
        error: "unauthorized"
      })
    }
    await next();
})

userRouter.get("/unApprovedUsers", async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const result = await prisma.user.findMany({where: {'approved': false}});
        return c.json(result, 200);
    } catch (e) {   
        return c.json({message: "Error"}, 411);
    }
})

userRouter.post("/apply", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const inputPayload = await c.req.json();
    const parsedPayload = applyAuth.parse(inputPayload);
    if (!parsedPayload) {
          return c.json({
            message: "Error applying to the scheme"
        })
    }

    if (await prisma.user.findFirst({where: {username: parsedPayload.username}})) {
        if (await prisma.schemes.findFirst({where: {schemeId: parsedPayload.schemeId}})) {
            try {
                const application = await prisma.application.create({data: {
                    username: parsedPayload.username,
                    schemeId: parsedPayload.schemeId,
                    approved: false
                }})
                return c.json({
                    message: "Application submitted"
                }, 200)
            } catch (e) {
                return c.json({message: e});
            }
        }
        return c.json({
            message: "Scheme not found"
        }) 
    } else {
        return c.json({
            message: "User not found"
        })
    } 
})

export default userRouter
