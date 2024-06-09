import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Jwt } from "hono/utils/jwt";
import zod from "zod";

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}

type Variables = {
    username: string
}

const adminRouter = new Hono<{Bindings: Bindings, Variables: Variables}>()

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

adminRouter.post("/signin", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload: {
        username: string,
        password: string
    } = signInAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Error logging in. Try again"
        }, 411)
    }

    if (await prisma.admin.findFirst({
        where: {
            username: parsedPayload.username,
            password: parsedPayload.password
        }
    })) {
        const token = await Jwt.sign({username: parsedPayload.username}, c.env.JWT_SECRET)
        return c.json({
            message: "Sign in successful",
            token: token
        }, 200)
    }
    return c.json({
        message: "Error while logging in"
    }, 411)
})

adminRouter.use("/*", async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) {
      c.status(401);
      return c.text("Unauthorized");
    }
  
    const { username } = await Jwt.verify(token, c.env.JWT_SECRET) as { username: string };
    if (!username) {
      c.status(401);
      return c.json({
        error: "Unauthorized"
      })
    }
    await next();
})

adminRouter.post("/addScheme", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload: {
        schemeName: string,
        schemeId: string,
        minAge: number,
        gender: string,
        areaOfResidence: string,
        annualIncome: number,
    } = schemeAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Error adding scheme"
        }, 411)
    }

    if (await prisma.schemes.findFirst({
        where: {schemeId: parsedPayload.schemeId}
    })) {
        return c.json({
            message: "Scheme already in database"
        }, 200)
    }

    await prisma.schemes.create({
        data: {
            schemeName: parsedPayload.schemeName,
            schemeId: parsedPayload.schemeId,
            minAge: parsedPayload.minAge,
            gender: parsedPayload.gender,
            areaOfResidence: parsedPayload.areaOfResidence,
            annualIncome: parsedPayload.annualIncome,
        }
    })

    return c.json({
        message: "Scheme added successfully"
    }, 200);
})

adminRouter.put("/approveAccount", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload: {
        username: string
    } = userAcc.parse(inputPayload);
    if (!inputPayload) {
        return c.json({
            message: "Internal error"
        }, 411)
    }

    if (!(await prisma.user.findFirst({where: {username: parsedPayload.username}}))) return c.json({
        message: "User not found"
    }, 411);

    await prisma.user.update({
        where: {username: parsedPayload.username},
        data: {approved: true}
    })
    return c.json({
        message: "User approved successfully"
    }, 200)
})

adminRouter.put("/approveApplication", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload: {
        username: string,
        schemeId: string
    } = applicationAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Incorrect inputs. Try again"
        }, 411)
    }
    try {
        const application = await prisma.application.findFirst({where: {username: parsedPayload.username, schemeId: parsedPayload.schemeId}})
        if (!(application)) return c.json({
            message: "Application not found"
        }, 411);
    
        await prisma.application.update({
            where: {applicationId: application.applicationId},
            data: {approved: true}
        })
        
        return c.json({
            message: "Application approved successfully"
        }, 200)
    }
    catch {
        return c.json({
            message: "Error submitting application"
        }, 404)
    }
})  

adminRouter.delete("/deleteScheme", async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const inputPayload = await c.req.json();
    const parsedPayload: {
        schemeId: string
    } = deleteSchemeAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Invalid inputs"
        })
    }

    if (await prisma.schemes.findFirst({where: {schemeId: parsedPayload.schemeId}})) {
        try {
            const response = await prisma.schemes.delete({where: {schemeId: parsedPayload.schemeId}});
            return c.json({
                message: "Scheme deleted succesfully"
            }, 200)
        }
        catch(e) {
            return c.json({
                message: e
            })
        } 
    } else {
        return c.json({
            message: "Scheme not found"
        })
    }
})

adminRouter.delete("/deleteApplication", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const inputPayload = await c.req.json();
    const parsedPayload: {
        username: string,
        schemeId: string
    } = deleteApplicationAuth.parse(inputPayload);
    if (!parsedPayload) {
        return c.json({
            message: "Invalid inputs"
        })
    }

    const application = await prisma.application.findFirst({where: {username: parsedPayload.username, schemeId: parsedPayload.schemeId}});
    if (application) {
        try {
            await prisma.application.delete({
                where: {username: parsedPayload.username, schemeId: parsedPayload.schemeId, applicationId: application.applicationId}
            })
            return c.json({
                message: "Application rejected"
            }, 200)
        } catch (e) {
            return c.json({
                message: e
            })
        }
    } else {
        return c.json({
            message: "Couldn't find the application"
        })
    }
})

export default adminRouter