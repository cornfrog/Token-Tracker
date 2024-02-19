import express from "express"
import { FollowedCoin, User, Coin } from "../../../models/index.js"

const userCoinRouter = new express.Router()

userCoinRouter.delete("/:sort_index", async (req, res) => {
    try{
        const userID = req.user.id
        const coinSI = req.params.sort_index
        // console.log("UserID: ", userID)
        // console.log("CoinSI: ", coinSI)
        const coinToUnfollow = await Coin.query().findOne({sort_index: coinSI})
        // console.log(coinToUnfollow)
        const wasUnfollowed = await FollowedCoin.query().delete().where({userID: userID, coinID: coinToUnfollow.id})
        const queryForUser = await User.query().findById(userID)
        const newCoinList = await queryForUser.$relatedQuery("coins")
        return res.status(200).json({wasUnfollowed: wasUnfollowed, newFollowList: newCoinList})
    } catch (error) {
        // console.log(error)
        return res.status(500).json({errors: error})
    }
})


userCoinRouter.patch("/", async (req, res) => {
    try {
        const userID = req.user.id
        const coinSort_Index = req.body.coinToFollow
        const coinToFollow = await Coin.query().findOne({sort_index: coinSort_Index})
        const coinFollowed = await FollowedCoin.query().insert({userID: userID, coinID: coinToFollow.id})
        return res.status(201).json({coinFollowed})
    } catch (error) {
        return res.status(500).json({errors: error})
    }
})

export default userCoinRouter