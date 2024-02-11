import React, { useEffect } from "react"
import TickerTile from "./TickerTile"

const TickerList = (props) => {
    const defaultCoins = [
        {
            id: "BTC",
            name: "Bitcoin",
            channel: "BTC-USD"
        },
        {
            id: "ETH",
            name: "Ethereum",
            channel: "ETH-USD"
        },
        {
            id: "SOL",
            name: "Solana",
            channel: "SOL-USD"
        }
    ]

    const tickerList = defaultCoins.map((coin) => {
        return <TickerTile channel={coin.channel} coinName={coin.name} key={coin.id}/>
    })

    return (
        <div className="ticker-list">
            {tickerList}
        </div>
    )
}

export default TickerList