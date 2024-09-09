const jwt = require("jsonwebtoken")
const JwtSecret = process.env.JWT_SECRET

const authMiddleware = (req,res,next)=>{

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message:"Not Authorised (Missing Token)"
        });
    }

    const token = authHeader.split(" ")[1];

try{
    const decoded = jwt.verify(token,JwtSecret)
    if(decoded.userId){
        req.userId=decoded.userId;
        next();
    }
    else{
        return res.status(411).json({
            msg:"Not Authorizedd"
        });
    }
}

catch(err){
    return res.status(403).json({ message: "Something Went Wrong" });
    }
};



module.exports = authMiddleware;
