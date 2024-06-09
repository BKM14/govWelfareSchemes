import { Hono } from "hono";
import applicationRouter from "./applicationRouter";
import userRouter from "./userRouter";
import schemeRouter from "./schemeRouter";
import adminRouter from "./adminRouter";

const mainRouter = new Hono();

mainRouter.route("/application", applicationRouter)
mainRouter.route("/user", userRouter)
mainRouter.route("/admin", adminRouter)
mainRouter.route("/scheme", schemeRouter)

export default mainRouter;