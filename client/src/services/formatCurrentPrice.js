const formatCurrentPrice = (currentPrice, incomingPrice) => {
    const formattedPrice = {}
    const formattedCurrentPrice = currentPrice.replace(/[^\d.]/g, '')
    const currentPriceAsFloat = parseFloat(formattedCurrentPrice)
    const priceAsFloat = parseFloat(incomingPrice)
    if (priceAsFloat > currentPriceAsFloat) {
        formattedPrice.status = "price-up"
    } else if (priceAsFloat === currentPriceAsFloat) {
        formattedPrice.status = "price-same"
    } else {
        formattedPrice.status = "price-down"
    }
    formattedPrice.price = priceAsFloat.toLocaleString("en-US", { style: "currency", currency: "USD" })
    return formattedPrice
}

export default formatCurrentPrice