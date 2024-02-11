const getCoinsFromCoinbase = async () => {
    try {
        const currencyListFetch = await fetch("https://api.coinbase.com/v2/currencies/crypto")
        const parsedCurrencyList = await currencyListFetch.json()
        const arrayOfCoins = parsedCurrencyList.data
        const defaultCoins = arrayOfCoins.map((coin) => {
            return {
                name: coin.name,
                code: coin.code,
                CB_id: coin.sort_index,
                channel: `${coin.code}-USD`
            }
        })
        return defaultCoins
    } catch (error) {
        console.log("Error in fetch: ", error)
    }
}

export default getCoinsFromCoinbase