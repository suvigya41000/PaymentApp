const {Router}=require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transactions } = require("../database");
const router=Router();
const mongoose=require("mongoose");
router.get("/balance",authMiddleware, async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }
    res.json({
        balance:account.balance
    })
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();

    const {amount,to}=req.body;
    const account=await Account.findOne({
        userId:req.userId
    })
    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }
    const toAccount=await Account.findOne({
        userId: to
    }).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{balance:-amount},
        "$push":{
                    transactions:`${amount} sent to ${to}`
            }
    }).session(session);
    await Account.updateOne({
        userId:to
    },{$inc:{balance:amount},
    "$push":{
                    transactions:`received ₹${amount} from ${to}`
            }
    }).session(session)
    await session.commitTransaction();
    res.json({
        message:"transaction successful"
    })
})
router.get("/transactions",authMiddleware,async (req,res)=>{
    const user=await Account.findOne({
        userId:req.userId
    })
    if(!user){
        return res.status(400).json({
            message:"No acount found"
        });
    }
        res.json({
            transactions:user.transactions
        })
})
module.exports=router;