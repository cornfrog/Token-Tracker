import React, { useState, useEffect } from "react"
import formatCurrentPrice from "../../services/formatCurrentPrice"

const TickerTile = (props) => {
    const channel = props.channel
    const coinName = props.coinName
    const coinID = props.coinID
    const [currentPrice, setCurrentPrice] = useState({
        price: "---",
        status: ""
    })

    useEffect(() => {

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
            const formattedPrice = formatCurrentPrice(currentPrice.price, priceFromSocket)
            setCurrentPrice(formattedPrice)
        }

        return () => {
            connection.close()
        }
    }, [channel])

    return (
        <p className="price-ticker">{coinName} [{coinID}] - <span className={currentPrice.status}>{currentPrice.price}</span></p>
    )
}

export default TickerTile