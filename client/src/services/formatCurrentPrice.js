const formatCurrentPrice = (currentPrice, incomingPrice) => {
    const formattedPrice = {}
    const currentPriceAsFloat = parseFloat(currentPrice.replace(/[^\d.]/g, ''))
    const priceAsFloat = parseFloat(incomingPrice)
    if(priceAsFloat >= currentPriceAsFloat){
        formattedPrice.status = "price-up"
    }
    else{
        formattedPrice.status = "price-down"
    }
    formattedPrice.price = priceAsFloat.toLocaleString("en-US", {style:"currency", currency:"USD"})
    return formattedPrice 
}

export default formatCurrentPrice