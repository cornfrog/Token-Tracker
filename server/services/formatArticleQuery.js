const formatArticleQuery = (followedCoins) => {
    const coinNames = followedCoins.map((coin) => {
        return coin.name
    })
    const coinQuery = `(${coinNames.join(" OR ")})`
    return coinQuery
}

export default formatArticleQuery