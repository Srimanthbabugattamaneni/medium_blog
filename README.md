Medium Blog Backend API
This project is a backend API for a Medium-like blog application built with Hono, Prisma, and designed to run on Cloudflare Workers.

Features
User authentication (signup and signin)
Blog post creation, updating, and retrieval
JWT-based authorization
Tech Stack
Hono: Lightweight web framework
Prisma: ORM for database operations
Prisma Accelerate: For improved database performance
Cloudflare Workers: Serverless platform for deployment
Project Structure
src/index.ts: Main application file
src/routes/user.ts: User-related routes (signup, signin)
src/routes/blog.ts: Blog-related routes (create, update, get posts)
Setup
Clone the repository
Install dependencies: