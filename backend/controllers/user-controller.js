

import User from '../models/user';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (error) {
        return console.log(error);
        // some sort of server error
    }

    if (!users) {
        return res.status(404).json({ message: "no users found!" });
        // no users, Empty users list
    }
    return res.status(200).json({ users });
}

export const signup = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        let existingUser;

        try {
            existingUser = await User.findOne({ email });
        } catch (error) {
            return console.log(error);
        }

        if (existingUser) {
            return res.status(400).json({ message: "User account already exists, Login instead." })
        }


        const hashedpassword = bcrypt.hashSync(password);
        // if user is really new
        const user = new User({
            name,
            email,
            password: hashedpassword,
        });

        try {
            user.save();
        } catch (error) {
            return console.log(error);
        }

        return res.status(201).json({ user })
    } catch (error) {
        return console.log(error);
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    existingUser = await User.findOne({ email });


    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "User Doesn't exist by that email." })
    }

    // if that email exists compare the password, returns a boolean
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        // 400: unauthorized
        return res
            .status(400)
            .json({ message: "Incorrect Password" });
    }

    return res
        .status(200)
        .json({ message: "login successfull" });
}