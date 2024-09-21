import { Hono } from "hono/tiny";
import {  sign , verify} from 'hono/jwt'
import { Jwt } from "hono/utils/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context } from "hono";

export const blogrouter = new Hono<{
    Bindings:  {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();



blogrouter.use('/*', async (c, next) => {


	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	
	const user = await verify(jwt, c.env.JWT_SECRET);
    if(user){
       
        c.set("userId", user.id as string);
         await next();
    }
    else{
        c.status(403);
        return c.json({
            message:"you are not login"
        })
    }
})


  
blogrouter.post('/', async (c) => {
    const prisma = new PrismaClient({
  
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const userId = c.get('userId');

    
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
        return c.json({
           id: post.id
        });
    
    
})

blogrouter.put('/', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const userId = c.get('userId');
	prisma.post.update({
		where: {
			id: body.id,
            authorId:userId
			
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogrouter.get('/:id', async (c) => {

  
        const id = c.req.param('id');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
        
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
    
        return c.json(post);


})

blogrouter.get(' /bulk', async (c) => {

    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const posts = await prisma.post.findMany();

	return c.json(posts);
 
}) 
