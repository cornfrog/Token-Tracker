import React, { useEffect, useState } from "react"
import parseCoinData from "../../services/parseCoinData"

const CoinShowData = (props) => {
    const [coinData, setCoinData] = useState({
        price: ""
    })
    const channel = props.channel

    useEffect(() => {
        const connection = new WebSocket('wss://ws-feed.exchange.coinbase.com')

        connection.onopen = () => {
            const subscribeRequest = {
                type: "subscribe",
                channels: [
                    {
                        name: "ticker",
                        product_ids: [channel]
                    }
                ]
            }
            const stringifiedRequest = JSON.stringify(subscribeRequest)
            connection.send(stringifiedRequest)
        }

        connection.onmessage = (event) => {
            const messageFromSocket = JSON.parse(event.data)
            const priceData = parseCoinData(messageFromSocket)
            setCoinData(priceData)
        }

        return () => {
            connection.close()
        }
    }, [channel])

    const formatPrice = (price) => {
        return parseFloat(price).toLocaleString("en-US", { style: "currency", currency: "USD" })
    }
    return (
        <div className="coin-price-details">
            <p>Current Price: {formatPrice(coinData.price)}</p>
            <p>Highest Price Today: {formatPrice(coinData.high_24h)}</p>
            <p>Lowest Price Today: {formatPrice(coinData.low_24h)}</p>
            <p>Opening Price Today: {formatPrice(coinData.open_24h)} </p>
            <p>24 Hour Volume: {coinData.volume_24h}</p>
            <p>30 Day Volume: {coinData.volume_30d}</p>
        </div>
    )
}

export default CoinShowData