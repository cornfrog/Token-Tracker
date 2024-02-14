import React, { useState, useEffect } from "react"
import TickerTile from "./TickerTile"
import defaultCoinList from "../../constants/defaultCoinList"

const TickerList = ({ user }) => {
    const [coinList, setCoinList] = useState(defaultCoinList)

    useEffect(() => {
        if(user){            
            getCoinList()
        }
    }, [user])

    const getCoinList = () => {
        const testSignInCoin = { name: "DogeCoin", code: "DOGE", channel: "DOGE-USD" }
        const signedInList = [...coinList, testSignInCoin]
        console.log("Signed in List: ", signedInList)
        setCoinList(signedInList)
    }

    const tickerList = coinList.map((coin) => {
        return <TickerTile channel={coin.channel} coinName={coin.name} key={coin.code} coinCode={coin.code} />
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