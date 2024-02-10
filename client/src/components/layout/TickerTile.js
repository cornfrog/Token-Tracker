import React, { useState } from "react"
import formatCurrentPrice from "../../services/formatCurrentPrice"

const TickerTile = (props) => {
    const channel = props.channel
    const coinName = props.coinName
    const [currentPrice, setCurrentPrice] = useState("---")
    let connection = new WebSocket('wss://ws-feed.exchange.coinbase.com')

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
        if (messageFromSocket.type === "ticker") {
            const formattedPrice = formatCurrentPrice(priceFromSocket)
            setCurrentPrice(formattedPrice)
        }
    }

    return (
        <p>Current Price of {coinName} - {currentPrice}</p>
    )
}

export default TickerTile