

import express from "express";
import { getAllBlogs, addBlog, updateBlog, getById, deleteById } from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteById);

export default blogRouter;
