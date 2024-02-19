const parseCoinData = (coinData) => {
    const parsedCoin = {}
    const allowedAttributes = [
        "high_24h",
        "low_24h",
        "open_24h",
        "price",
        "volume_24h",
        "volume_30d",
    ]
    for(const attribute of allowedAttributes){
        parsedCoin[attribute] = coinData[attribute]
    }
    if(parsedCoin.price === undefined) {
        parsedCoin.price = ""
    }
    return parsedCoin
}

export default parseCoinData