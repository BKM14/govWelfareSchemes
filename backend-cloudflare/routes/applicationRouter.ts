import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}

type Variables = {
    username: string
}

const applicationRouter = new Hono<{Bindings: Bindings, Variables: Variables}>()

applicationRouter.use("/*", async (c, next) => {
    const token = c.req.header("Authorization");
    if (!token) {
      c.status(401);
      return c.text("unauthorized");
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

applicationRouter.get("/unApprovedApplications", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const applications = await prisma.application.findMany({where: {approved: false}});
    return c.json({applications}, 200);
})

export default applicationRouter