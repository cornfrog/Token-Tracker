import got from "got"
import parseCoins from "../../../services/parseCoins.js"
import { Coin } from "../../models/index.js"

class CoinSeeder {
    static async seed() {
        const coinbaseCoinAPI = "https://api.coinbase.com/v2/currencies/crypto"
        try {
            const gotRequestToCoinbase = await got(coinbaseCoinAPI)
            const parsedResponseFromCoinbase = parseJson(gotRequestToCoinbase.body)
            //const parsedResponseFromCoinbase = JSON.parse(gotRequestToCoinbase.body)
            const arrayOfCoins = parseCoins(parsedResponseFromCoinbase.data)
            for(const coin of arrayOfCoins) {
                await Coin.query().insert(coin)
            }
        } catch (error) {
            console.error("Error in got request: ", error)
        }
    }
}

export default CoinSeeder