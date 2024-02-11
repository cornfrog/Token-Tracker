import { Coin } from "../../models/index.js"
import getCoinsFromCoinbase from "../../services/getCoinsFromCoinbase.js"

class CoinSeeder {
    static async seed() {
        const coins = await getCoinsFromCoinbase()
        console.log(coins)
    }
}

export default CoinSeeder