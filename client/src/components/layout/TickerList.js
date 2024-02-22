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
        try {
            const fetchUserFollowedCoins = await fetch("/api/v1/coins/user-ticker-list")
            const parsedFollowedCoins = await fetchUserFollowedCoins.json()
            const userFollowedCoins = parsedFollowedCoins.tickerList
            const userTickerList = parseCoins(userFollowedCoins)
            setCoinList(userTickerList)
        } catch (error) {
            console.error("Error in Fetch: ", error)
        }
    }

    const tickerList = coinList.map((coin) => {
        return <TickerTile channel={coin.channel} coinName={coin.name} key={coin.code} coinCode={coin.code} />
    })


    const goToEditPage = () => {
        return window.location.href = "/my-coins/edit"
    }

    const editUserCoinListButton = <button  className="edit-coins-button" onClick={goToEditPage}>Edit Coin List</button> 

    return (
        <>
            <h1 className="tracked-coins-header">Tracked Coins</h1>
            <div className="ticker-list">
                {tickerList}
            </div>
            {user ? editUserCoinListButton : null}
        </>
    )
}

export default TickerList