import  jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = (req, res, next) => {       

    try {
        
        const token = req.header('Authorization')
        // console.log("token", token);
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}


export default authMiddleware;