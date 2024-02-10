const formatCurrentPrice = (currentPrice) => {
    const priceAsFloat = parseFloat(currentPrice)
    const formattedPrice = priceAsFloat.toLocaleString("en-US", {style:"currency", currency:"USD"})
    return formattedPrice 
}

export default formatCurrentPrice