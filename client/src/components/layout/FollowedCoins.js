import React, { useState, useEffect } from "react"

const FollowedCoins = (props) => {
    const [currentFollowedCoinList, setFollowedCoinList] = useState([])

    const getFollowedCoins = async () => {
        try {
            const fetchedFollowedCoins = await fetch("/api/v1/coins/user-coins")
            const parsedFollowedCoins = await fetchedFollowedCoins.json()
            console.log("Followed Coins: ", parsedFollowedCoins.followList)
            setFollowedCoinList(parsedFollowedCoins.followList)
        } catch (error) {
            console.error("Error in fetch:", error)
        }

    }

    useEffect(() => {
        getFollowedCoins()
    }, [])


    const unfollowCoin = async (event) => {
        console.log(event.currentTarget.value)
        const coinSI = event.currentTarget.value
        try {  
            const unfollowedCoin = await fetch(`/api/v1/user-coins/${coinSI}`, {
                method: "delete",
                headers: new Headers({ "Content-Type": "application/json" }),
            })
            const parsedUnfollowResponse = await unfollowedCoin.json()
            console.log(parsedUnfollowResponse)
            if(parsedUnfollowResponse.wasUnfollowed){
                setFollowedCoinList(parsedUnfollowResponse.newFollowList)
            }
        } catch (error){
            console.error("Error in fetch: ", error)
        }
    }

    const followedCoins = currentFollowedCoinList.map((coin) => {
        return (
            <label key={coin.sort_index} className="coin-label">
                <input className="coin-check" type="checkbox" defaultChecked value={coin.sort_index} onClick={unfollowCoin}/>
                {coin.name} - [{coin.code}]
            </label>
        )
    })

    return (
        <form className="user-coins">
            {followedCoins}
        </form>
    )
}

export default FollowedCoins