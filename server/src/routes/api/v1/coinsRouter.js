import express from "express"
import { User } from "../../../models/index.js"

const coinRouter = new express.Router()

coinRouter.get("/user-coins", async (req, res) => {
    const userID = req.user.id
    try {
        const queriedUser = await User.query().findById(userID)
        const followedCoins = await queriedUser.$relatedQuery("coins")
        res.status(200).json({followedCoins: followedCoins})
    } catch (error) {
        res.status(500).json({errors: error})
    }
})

export default coinRouter