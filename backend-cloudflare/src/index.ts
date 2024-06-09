import { Hono } from 'hono';
import { cors } from 'hono/cors';
import mainRouter from '../routes';


const app = new Hono();
app.use(cors());
app.route("/", mainRouter)

export default app
