import User from "../Models/user.schema.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import randomColor from 'randomcolor';
dotenv.config()



export const userRegistration = async (req, res) => {


    try {
        const { password, email, username, about, firstName, lastName, Country, Address, city, region, postalCode} = req.body;
        const isAlreadyData = await User.find();
        const existingUser = isAlreadyData.find((user) => user.email === email);

        if (existingUser) {
            return res.status(200).json({ message: 'User with this email already exists' });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({password: hashPass,email, username, about, firstName, lastName, Country, Address, city, region, postalCode });
        await newUser.save();
        res.status(201).json({ message: `User ${firstName, lastName} successfully registered` });



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed" });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(200).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        await User.updateOne({ _id: user._id }, { token: token })
        res.status(200).json({ message: 'Logging successfully', token:token, email: email });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
}

// reset password by id-----------------------

export const resetPassword = async (req, res) => {
    try {

        const password = await bcrypt.hash(req.body.password, 10)
        const string = req.body.string
        const user = await User.findOne({ string })
        // console.log(user);

        if (!user) {
            res.status(200).json({ message: 'User not found' });
            return res.status(404).json({ message: 'User not found' });
        }
        const result = await User.updateMany({ string: user.string }, { password: password, string: "" })

        if (result.matchedCount === 0) {
            res.status(200).json({ message: 'user not matched' })
            return res.status(401).json({ message: 'user not matched' })
        }
        res.status(200).json({ message: 'password updated sucessfully' })

    } catch (error) {
        console.log('error in resetpassword section', error);
    }


}



export const getUser = async(req, res)=>{
    try {
        const userId = req.user._id
        // console.log(userId);
        const user = await User.findById(userId)
        // console.log(user);
        res.status(200).json(user)
        
    } catch (error) {
        console.log("getuser error", error);
    }
}


export const generateAndStoreRandomColor = async () => {
    try {
        const users = await User.find();

        if (users.length > 0)
         {  for (const user of users) {
            const now = new Date().toDateString();
            const randomColorValue = randomColor();
            const colorData = {
                date: now,
                color: randomColorValue,
            };

            console.log(colorData);
            await User.findByIdAndUpdate(
                user._id,
                { $push: { colordata: colorData } },
                { new: true }
            );
        }

        console.log('Color data updated for all users.')
    }else{
        console.log('No users found. Skipping color data update.');
    }
     
    } catch (error) {
        console.error('Error updating color data:', error);
    }
};


