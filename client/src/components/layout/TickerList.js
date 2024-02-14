import React, { useState, useEffect } from "react"
import TickerTile from "./TickerTile"
import defaultCoinList from "../../constants/defaultCoinList"

const TickerList = (props) => {
    const [coinList, setCoinList] = useState([])

    const getCoinList = async () => {
        setCoinList(defaultCoinList)
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