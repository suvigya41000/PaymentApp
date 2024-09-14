const express=require("express")
const zod=require("zod");
const { User, Account } = require("../database");
const { JWT_token } = require("../config");
const { authMiddleware } = require("../middleware");
const jwt = require("jsonwebtoken");

const router=express.Router()

const signupSchema=zod.object({
    userName:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async (req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(body);
    if(!success){//check if input is correct or not
        return res.status(411).json({
            message:"Email already taken/Incorrect input"
        })
    }
    //check if user already exist or not
    const user=await User.findOne({
        userName:body.userName
    })
    if(user){
        return res.status(411).json({
            message:"Email already taken/Incorrect input"
        })
    }
    //creating new user user id user does not already exist
    const newUser= await User.create(body);
    //creating new new Account for user
    await Account.create({
        userId:newUser._id,
        balance:1+Math.random()*10000
    })
    //authentication token
    const token=jwt.sign({userId: newUser._id},JWT_token)
    res.json({
        message:"User Created successfully",
        token:token
    })
    
})

const signinSchema=zod.object({
    userName:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async (req,res)=>{
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }//to find the user
    const user=await User.findOne({
        userName:body.userName,
        password:body.password
    })
    //if user exist 
    if(user){
        //genertae token
        const token=jwt.sign({
            userId:user._id
        },JWT_token)
        //get the token
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        message:"Error while logging in"
    })
})

const updateSchema=zod.object({
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.put("/",authMiddleware,async (req,res)=>{
    const body=req.body;
    const {success}=updateSchema.safeParse(body);
    if(!success){
        res.json({
            message:"Incorrect Input"
        })
    }
    await User.updateOne(req.body,{
        _id:req.userId
    })
    res.json({
        message:"Updated successfully"
    })

})

//to get the users
router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter,
                "$options": "i"
            }
        },{
            lastName:{
                "$regex":filter,
                "$options": "i"
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            userName:user.userName,
            firstName:user.firstName,
            lastName: user.lastName,
            _id:user._id
        }))
    })
})
router.get("/details",authMiddleware,async (req,res)=>{
    const user=await User.findOne({
        _id:req.userId
    })
    res.json({
        userName:user.userName,
        firstName:user.firstName,
        lastName:user.lastName,
        id:user._id
    })
})
module.exports=router;
