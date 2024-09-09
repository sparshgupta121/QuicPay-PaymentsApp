const express = require("express");
const zod = require("zod")
const {Account, User} = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware')
const JwtSecret= process.env.JWT_SECRET
const userRouter = express.Router();

const reqbody = zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    username:zod.string().email(),
    password:zod.string().min(6)
    .max(15)

})

userRouter.post("/signup",async (req,res)=>{

    const inputBody = req.body;
    const {success} = reqbody.safeParse(inputBody)

    if(!success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username:inputBody.username
    })

    if(existingUser){
        return res.json({
            message: "Email already taken, Please Signin"
        })
    }

    const hashedPassword = await bcrypt.hash(inputBody.password, 2);

        const Newuser = await User.create({
            ...inputBody,
            password: hashedPassword
        });

        const userId = Newuser._id;

        Account.create({
            user:userId,
            balance: Math.floor(Math.random() * 10000) + 1
        })


    const jwttoken = jwt.sign({
        userId: Newuser._id
    },JwtSecret)

    res.json({
        message:"User Created Succesfully",
        Token:jwttoken,
    })
    
})

const Signinbody = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6).max(15)
})

userRouter.post("/signin", async (req, res) => {
    const {success} = Signinbody.safeParse(req.body);

    if(!success){
        return res.json({
            message:"Inavlid Inputs"
        })
    }

    ReqBody=req.body

    try {
        const user = await User.findOne({ username: ReqBody.username });

        if (!user) {
            return res.json({
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(ReqBody.password, user.password);

        if (!isMatch) {
            return res.json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: user._id }, JwtSecret,);

        res.json({
            Token: token,
            firstname:user.firstname,
            message:"Sign In Successfully"

        });
    } catch (error) {
        res.json({
            message: "Error while Sign In"
        });
    }
});

const updatedBody = zod.object({
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    password:zod.string().min(6).max(15).optional()
})

userRouter.put("/",authMiddleware,async(req,res)=>{

   

    const {success} = updatedBody.safeParse(req.body);

    if(!success){
        return res.json({
            message:"Invalid inputs"
        })
    }

    try{
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 2);
    }
    
    await User.updateOne({ _id: req.userId },          
        { $set: req.body })

    res.json({
        message:"Info Updated"
    })

} catch(error){
    res.json({
        message:"Error Occoured"
    })
}
}

)

userRouter.get("/bulk",authMiddleware,async (req,res)=>{

    try{
    const filter = req.query.filter || "";

    const MatchedUsers = await User.find({
        $or:[
            {firstname:{$regex:filter,$options: 'i'}},
            {lastname:{$regex:filter,$options: 'i'}}
        ]

    }).select ("firstname lastname username _id");

    res.status(200).json({
        users:MatchedUsers
    }) 
}
catch (error) {
    res.status(500).json({
        message: "Error fetching users"
    });
}


});

const ResetBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6).max(15)
});

userRouter.put("/resetpassword", async (req, res) => {
    const { success } = ResetBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid Inputs",
        });
    }

    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (!existingUser) {
            return res.status(404).json({
                message: "No Such User Exists in DB, Kindly Sign In"
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password,2); 

    
        await User.findByIdAndUpdate(existingUser._id, { password: hashedPassword });

        return res.status(200).json({
            message: "Password Reset Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error Occurred",
        });
    }
});

module.exports= userRouter;