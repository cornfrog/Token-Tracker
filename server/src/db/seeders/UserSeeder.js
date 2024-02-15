import { User, Coin } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const user = {
            username: "corey",
            email: "corey@email.com",
            password: "123",
        }
        await User.query().insert(user)

        // const seededFollowedCoins = [97, 98, 99, 100]
        // for (const coinID of seededFollowedCoins) {
        //     user.followedCoin = coinID
        // }
        // const seededUser = await User.query().findOne({ username: "corey" })
        // console.log("seeded user: ", seededUser)
        //     const seededCoin = await Coin.query().findOne({ id: coinID })
        //     console.log("seeded coin: ", seededCoin)
        //     await seededUser.$relatedQuery("coins").insert(seededCoin)
        // }
    }
}
export default UserSeeder