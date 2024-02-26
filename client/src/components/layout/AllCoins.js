import React, { useState, useEffect } from "react"
import serializeCoinList from "../../../../server/services/serializeCoinList"

const AllCoins = (props) => {
    const [coinLists, setCoinList] = useState({
        unfollowedCoins: [],
        followedCoins: []
    })

    const getCoins = async () => {
        try {
            const fetchedCoinLists = await fetch("/api/v1/coins/all-coins")
            const parseCoinLists = await fetchedCoinLists.json()
            const coinLists = {
                unfollowedCoins: parseCoinLists.unfollowedCoins,
                followedCoins: parseCoinLists.followedCoins
            }
            setCoinList(coinLists)
        } catch (error) {
            console.error("Error in fetch: ", error)
        }
    }

    useEffect(() => {
        getCoins()
    }, [])

    const updateCoins = async (event) => {
        //this is backwards - and i dont know why...
        if (!event.currentTarget.checked) {
            // if the coin is currently being followed 
            event.currentTarget.parentNode.className = "unfollowed"
            const coinID = event.currentTarget.value
            try {
                const unfollowedCoin = await fetch(`/api/v1/user-coins/${coinID}`, {
                    method: "delete",
                    headers: new Headers({ "Content-Type": "application/json" }),
                })
                const parsedUnfollowResponse = await unfollowedCoin.json()
            } catch (error) {
                console.error(error)
            }
        } else {
            // if coin is NOT being followed
            console.log("follow")
            event.currentTarget.parentNode.className = "followed-coin"
            const coinID = event.currentTarget.value
            try {
                const followCoin = await fetch("/api/v1/user-coins/", {
                    method: "PATCH",
                    headers: new Headers({ "Content-Type": "application/json" }),
                    body: JSON.stringify({ coinToFollow: coinID })
                })
                const parsedFollowCoinResponse = await followCoin.json()
            } catch (error) {
                console.error(error)
            }
        }
    }

    const unfollowedCoins = coinLists.unfollowedCoins.map((coin) => {
        return (
            <label key={coin.sort_index} className="unfollowed">
                <input type="checkbox" className="coin-check" value={coin.sort_index} onChange={updateCoins} />
                <span>{coin.name} - [{coin.code}]</span>
            </label>
        )
    })

    const followedCoins = coinLists.followedCoins.map((coin) => {
        return (
            <label key={coin.sort_index} className="followed-coin">
                <input className="coin-check" type="checkbox" value={coin.sort_index} defaultChecked onChange={updateCoins} />
                <span>{coin.name} - [{coin.code}]</span>
            </label>
        )
    })

    const allCoins = followedCoins.concat(unfollowedCoins)

    return (
        <>
            <p className="list-hint">Click to Follow Coins:</p>
            <form className="all-coins">
                {allCoins}
            </form>
        </>
    )
}

export default AllCoins