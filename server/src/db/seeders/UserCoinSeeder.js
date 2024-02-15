import { User, FollowedCoin } from "../../models/index.js"

class UserCoinSeeder {
    static async seed() {
        const seededFollowedCoins = [2, 97, 98, 99, 100]
        try{
            const seededUser = await User.query().findOne({username: "corey"})
            for(const coin of seededFollowedCoins){
                await FollowedCoin.query().insert({userID: seededUser.id, coinID: coin})
            }
        } catch(error) {
            console.error("Error in User Coin Seeder:", error)
        }
    }
}

export default UserCoinSeeder