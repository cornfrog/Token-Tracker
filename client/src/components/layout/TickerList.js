import React, { useState, useEffect } from "react"
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
            id: "XRP",
            name: "Ripple",
            channel: "XRP-USD"
        }
    ]

    const [coinList, setCoinList] = useState([])

    const getCoinList = async () => {
        const getDefaultCoinsList = await fetch("/api/v1/coins/default-coins")
        const parsedCoinListResponse = await getDefaultCoinsList.json()
        setCoinList(parsedCoinListResponse.coinList)
    }

    console.log(coinList)

    useEffect(() => {
        getCoinList()
    }, [])

    const tickerList = coinList.map((coin) => {
        return <TickerTile channel={coin.channel} coinName={coin.name} key={coin.code} coinCode={coin.code}/>
    })

    return (
        <>
            <h1 className="tracked-coins-header">Tracked Coins</h1>
            <div className="ticker-list">
                {tickerList}
            </div>
        </>
    )
}

export default TickerList