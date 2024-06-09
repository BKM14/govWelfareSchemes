import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

type Bindings = {
    DATABASE_URL: string,
}

const schemeRouter = new Hono<{Bindings: Bindings}>()

schemeRouter.get("/schemes", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const schemes = await prisma.schemes.findMany();
    return c.json({schemes}, 200);
})

export default schemeRouter