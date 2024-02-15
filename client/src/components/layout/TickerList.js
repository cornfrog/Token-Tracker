import React, { useState, useEffect } from "react"
import TickerTile from "./TickerTile"
import defaultCoinList from "../../constants/defaultCoinList"
import parseCoins from "../../../../server/services/parseCoins"

const TickerList = ({ user }) => {
    const [coinList, setCoinList] = useState(defaultCoinList)

    useEffect(() => {
        if(user){            
            getCoinList()
        }
    }, [user])

    const getCoinList = async () => {
        // const testSignInCoin = { name: "DogeCoin", code: "DOGE", channel: "DOGE-USD" }
        // const signedInList = [...coinList, testSignInCoin]
        // setCoinList(signedInList)
        try {
            const fetchUserFollowedCoins = await fetch("/api/v1/coins/user-coins")
            const parsedFollowedCoins = await fetchUserFollowedCoins.json()
            const userFollowedCoins = parsedFollowedCoins.followedCoins
            const userTickerList = parseCoins(userFollowedCoins)
            setCoinList(userTickerList)
        } catch (error) {
            console.error("Error in Fetch: ", error)
        }
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