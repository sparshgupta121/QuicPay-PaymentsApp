const express = require("express");
const { Account } = require("../db");
const zod = require("zod");
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
    amount: zod
        .string()
        .refine((n) => parseFloat(n) > 0, {
            message: "Invalid amount. Please enter a positive number.",
        }),
    to: zod.string()
});

AccountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const result = transferBody.safeParse(req.body);

    // Check for validation errors
    if (!result.success) {
        return res.status(400).json({
            message: result.error.errors[0].message, // Return the validation error message
        });
    }

    const { amount, to } = req.body;
    const transferAmount = parseFloat(amount); // Convert the string amount to a float

    try {
        const account = await Account.findOne({ user: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.balance < transferAmount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Update sender's balance
        await Account.updateOne(
            { user: req.userId },
            { $inc: { balance: -transferAmount } }
        );

        // Check if the target account exists
        const targetAccount = await Account.findOne({ user: to });
        if (!targetAccount) {
            return res.status(404).json({ message: "Target account not found" });
        }

        // Update recipient's balance
        await Account.updateOne(
            { user: to },
            { $inc: { balance: transferAmount } }
        );

        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error during transfer" });
    }
});

module.exports = AccountRouter;
