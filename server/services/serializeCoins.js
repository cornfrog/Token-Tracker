const serializeCoins = (arrayOfCoins) => {
    const serializedArrayOfCoins = []
    for (const coin of arrayOfCoins) {
        serializedArrayOfCoins.push(serializeCoin(coin))
    }
    return serializedArrayOfCoins
}

const serializeCoin = (coin) => {
    const allowedAttributes = ["name", "code", "sort_index"]
    const serializedCoin = {} 
    for(const attribute of allowedAttributes){
        serializedCoin[attribute] = coin[attribute] 
    }
    return serializedCoin
}

export default serializeCoins