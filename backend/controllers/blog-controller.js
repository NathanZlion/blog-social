

import Blog from "../models/blog";

export const getAllBlogs = async (req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" })
    }

    return res.status(200).json({ blogs });
}


export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    // validate if there really exists such a user,
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }

    if (!existingUser){
        return res.status(400).json({message: "No user by this id"})
    }

    const blog = new Blog({
        title, description, image, user
    });

    try {
        // in here we try to save the blog
        // plus we add the blog to the list of blogs for the user
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error});
    }

    return res.status(200).json({ blog });
}

export const updateBlog = async (req, res, next) => {

    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to update" });
    }

    return res.status(200).json({ blog });
}

export const getById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({ message: "can't find Blog" });
    }
    return res.status(200).json({ blog })
}

export const deleteById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndRemove(blogId);
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to delete" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
}
