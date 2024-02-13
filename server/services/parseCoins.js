const parseCoins = (arrayOfCoins) => {
    const serializedArrayOfCoins = []
    for (const coin of arrayOfCoins) {
        serializedArrayOfCoins.push(serializeCoin(coin))
    }
    return serializedArrayOfCoins
}

const parseCoin = (coin) => {
    const allowedAttributes = ["name", "code", "sort_index"]
    const serializedCoin = {} 
    for(const attribute of allowedAttributes){
        serializedCoin[attribute] = coin[attribute] 
    }
    return serializedCoin
}

export default parseCoins