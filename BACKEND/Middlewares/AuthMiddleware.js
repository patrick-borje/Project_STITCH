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
            if(user) return res.json({status: true, user: user.firstName, id: user._id})
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
// Middleware to verify if the user is an admin
export const adminVerification = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;  // Assuming you're using cookies for token storage
        
        if (!token) {
            return res.status(403).json({ success: false, message: "No token provided, access denied." });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID in the database
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the user is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied, admin privileges required." });
        }

        // Attach the user info to the request object to be used in other routes
        req.user = user;
        next(); // Allow the request to proceed
    } catch (error) {
        console.log("Error verifying admin:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

