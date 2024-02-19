import express from "express"
import { User, Coin } from "../../../models/index.js"
import serializeCoinList from "../../../../services/serializeCoinList.js"

const coinRouter = new express.Router()

coinRouter.get("/user-ticker-list", async (req, res) => {
    const userID = req.user.id
    try {
        const queriedUser = await User.query().findById(userID)
        const tickerList = await queriedUser.$relatedQuery("coins")
        return res.status(200).json({ tickerList: tickerList })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

coinRouter.get("/user-coins", async (req, res) => {
    // console.log("Current User: ", req.user)
    const userID = req.user.id
    try {
        const queriedUser = await User.query().findById(userID)
        const userCoins = await queriedUser.$relatedQuery("coins")
        const serializedFollowList = serializeCoinList(userCoins)
        // console.log(serializedFollowList)
        return res.status(200).json({ followList: serializedFollowList })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

coinRouter.get("/all-coins", async (req, res) => {
    const userID = req.user.id
    try {
        const queriedUser = await User.query().findById(userID)
        const userList = await queriedUser.$relatedQuery("coins")
        // console.log("Current User List: ", userList)
        const sortIndexes = userList.map((coin) => coin.sort_index)
        // console.log(sortIndexes)
        const coinList = await Coin.query().whereNotIn('sort_index', sortIndexes)
        // console.log(coinList)
        // console.log(coinList)
        const serializedCoinList = serializeCoinList(coinList)
        const serializedFollowedList = serializeCoinList(userList)
        return res.status(200).json({
            unfollowedCoins: serializedCoinList, 
            followedCoins: serializedFollowedList
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default coinRouter