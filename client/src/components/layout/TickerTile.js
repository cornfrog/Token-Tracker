import React, { useState, useEffect } from "react"
import formatCurrentPrice from "../../services/formatCurrentPrice"

const TickerTile = (props) => {
    const channel = props.channel
    const coinName = props.coinName
    const coinCode = props.coinCode
    const [currentPrice, setCurrentPrice] = useState({
        price: "---",
        status: ""
    })
    // matthew being weird
    // const [loading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const connection = new WebSocket('wss://ws-feed.exchange.coinbase.com')

        connection.onopen = () => {
            const subscribeRequest = {
                type: "subscribe",
                channels: [
                    {
                        name: "ticker_batch",
                        product_ids: [channel]
                    }
                ]
            }
            const stringifiedRequest = JSON.stringify(subscribeRequest)
            connection.send(stringifiedRequest)
        }

        connection.onmessage = (event) => {
            const messageFromSocket = JSON.parse(event.data)
            const priceFromSocket = messageFromSocket.price
            const formattedPrice = formatCurrentPrice(currentPrice.price, priceFromSocket)
            setCurrentPrice(formattedPrice)
        }

        return () => {
            connection.close()
        }
    }, [channel])

    const link = `/coins/${coinCode}`
    const linkToShowPage = <a href={link}>[{coinCode}]</a>

    return (
        <p className="price-ticker">{coinName} {linkToShowPage} - <span>{currentPrice.price}</span></p>
    )
}

export default TickerTile