import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const userVerification = (req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({status: false})
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if(err){
            return res.json({status: false})
        }else{
            const user = await User.findById(data.id)
            if(user) return res.json({status: true, user: user.firstName})
            else return res.json({status: false})
        }
    })
}

export const authenticateUser = (req, res, next) => {
  
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            } else {
                const user = await User.findById(data.id);
                if (user) {
                    req.user = user;  // Attach user data to the request object
                    return next();  // Pass control to the next middleware/route handler
                } else {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
            }
        });
    }catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error", error });
    }


   
    
}