import express from "express"
import { FollowedCoin, User, Coin } from "../../../models/index.js"

const userCoinRouter = new express.Router()

userCoinRouter.delete("/:sort_index", async (req, res) => {
    try {
        const userID = req.user.id
        const coinSI = req.params.sort_index
        const coinToUnfollow = await Coin.query().findOne({ sort_index: coinSI })
        const wasUnfollowed = await FollowedCoin.query().delete().where({ userID: userID, coinID: coinToUnfollow.id })
        const queryForUser = await User.query().findById(userID)
        const newCoinList = await queryForUser.$relatedQuery("coins")
        return res.status(200).json({ wasUnfollowed: wasUnfollowed, newFollowList: newCoinList })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})


userCoinRouter.patch("/", async (req, res) => {
    try {
        const userID = req.user.id
        const coinSort_Index = req.body.coinToFollow
        const coinToFollow = await Coin.query().findOne({ sort_index: coinSort_Index })
        const coinFollowed = await FollowedCoin.query().insert({ userID: userID, coinID: coinToFollow.id })
        return res.status(201).json({ coinFollowed })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})


userCoinRouter.get("/following/:coinCode", async (req, res) => {
    const coinCode = req.params.coinCode
    if(req.user) {
        try {
            const userID = req.user.id
            const queriedUser = await User.query().findById(userID)
            const queriedCoin = await Coin.query().findOne({ code: coinCode })
            const queryUserFollowList = await queriedUser.$relatedQuery("coins").where({ code: coinCode })
            let inUserFollowList = false
            if (queryUserFollowList.length >= 1) {
                inUserFollowList = true
            }
            const coinName = queriedCoin.name
            return res.status(200).json({ coinName, inUserFollowList, signedIn: true })
        } catch (error) {
            return res.status(500).json({ errors: error })
        }
    } else {
        try {
            const queriedCoin = await Coin.query().findOne({ code: coinCode })
            const coinName = queriedCoin.name
            return res.status(200).json({ coinName, signedIn: false })
        } catch (error) {
            return res.status(500).json({ errors: error })
        }
    }
})


userCoinRouter.delete("/unfollow/:code", async (req, res) => {
    const userID = req.user.id
    const coinCode = req.params.code
    try {
        const queriedCoin = await Coin.query().findOne({ code: coinCode })
        const wasUnfollowed = await FollowedCoin.query().delete().where({ userID: userID, coinID: queriedCoin.id })
        return res.status(200).json({wasUnfollowed})

    } catch (error) {

        return res.status(500).json({ errors: error })
    }
})

userCoinRouter.patch("/follow/", async (req, res) => {
    try {
        const userID = req.user.id
        const coinCode = req.body.coinToFollow
        const coinToFollow = await Coin.query().findOne({ code: coinCode })
        const coinFollowed = await FollowedCoin.query().insert({ userID: userID, coinID: coinToFollow.id })
        return res.status(201).json({ coinFollowed })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default userCoinRouter