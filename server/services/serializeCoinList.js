const serializeCoinList = (coinList) => {
    // console.log("Current Coin List: ", coinList)
    const serializedFollowList = coinList.map((coin) => {
        return serializeCoin(coin)
    })
    return serializedFollowList
}

const serializeCoin = (coin) => {
    const allowedAttributes = ["sort_index", "name", "code"]
    const serializedCoin = {}
    for (const attribute of allowedAttributes) {
        serializedCoin[attribute] = coin[attribute]
    }
    return serializedCoin
}

export default serializeCoinList