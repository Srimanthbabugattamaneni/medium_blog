import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  sign , verify} from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogrouter } from './routes/blog'



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string,
	}
}>();


app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogrouter);

export default app


//import { PrismaClient } from '@prisma/client/edge'
//import { withAccelerate } from '@prisma/extension-accelerate'

//const prisma = new PrismaClient().$extends(withAccelerate())