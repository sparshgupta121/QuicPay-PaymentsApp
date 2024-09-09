const express = require("express");
const {Account} = require("../db");
const zod = require("zod")
const authMiddleware = require("../middleware");

const AccountRouter = express.Router();

AccountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const accountUser = await Account.findOne({ user: req.userId });
        
        if (!accountUser) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: accountUser.balance });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching balance" });
    }
});

const transferBody = zod.object({
    amount:zod.string().refine(n => n > 0, {
        message: "Number must be positive"
      }),
    to:zod.string()

})


AccountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const {success} = transferBody.safeParse(req.body);

    if(!success){
        return res.json({
            msg:"Enter Valid Amount"
        })
    }
    const { amount, to } = req.body

    try {
        const account = await Account.findOne({ user: req.userId })

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        await Account.updateOne(
            { user: req.userId },
            { $inc: { balance: -amount } }
        )

        const targetAccount = await Account.findOne({ user: to })
        if (!targetAccount) {
            return res.status(404).json({ message: "Target account not found" });
        }

        await Account.updateOne(
            { user: to },
            { $inc: { balance: amount } }
        )

        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Error during transfer" });
    } 
});

module.exports = AccountRouter;
