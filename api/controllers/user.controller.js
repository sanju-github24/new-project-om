import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const test=(req,res) => {
    res.json({
        message:" Hello from user controller",
    });
}

// update user

export const updateUser = async (req, res,next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account"));
    }
    try{
        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10) // Hash the password here if needed
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
           $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
           }
        },
        {new: true} // Return the updated user
        );
        const {password, ...rest} = updatedUser._doc; // Exclude password from the response
        res.status(200).json(rest)   
    }catch(error){
        next(errorHandler(500, "Internal Server Error"));
    }

}