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
        console.log(event.currentTarget)
        //this is backwards - and i dont know why...
        if (!event.currentTarget.checked) {
            // if the coin is currently being followed 
            console.log("Unfollow")
            const coinID = event.currentTarget.value
            console.log(coinID)
            try {
                const unfollowedCoin = await fetch(`/api/v1/user-coins/${coinID}`, {
                    method: "delete",
                    headers: new Headers({ "Content-Type": "application/json" }),
                })
                const parsedUnfollowResponse = await unfollowedCoin.json()
                console.log(parsedUnfollowResponse)
            } catch (error) {
                console.error(error)
            }
        } else {
            // if coin is NOT being followed
            console.log("follow")
            const coinID = event.currentTarget.value
            console.log(coinID)
            try {
                const followCoin = await fetch("/api/v1/user-coins/", {
                    method: "PATCH",
                    headers: new Headers({ "Content-Type": "application/json" }),
                    body: JSON.stringify({ coinToFollow: coinID })
                })
                const parsedFollowCoinResponse = await followCoin.json()
                console.log(parsedFollowCoinResponse)

            } catch (error) {
                console.error(error)
            }
        }
    }

    const unfollowedCoins = coinLists.unfollowedCoins.map((coin) => {
        return (
            <label key={coin.sort_index}>
                <input type="checkbox" value={coin.sort_index} onChange={updateCoins} />
                {coin.name} - [{coin.code}]
            </label>
        )
    })

    const followedCoins = coinLists.followedCoins.map((coin) => {
        return (
            <label key={coin.sort_index}>
                <input type="checkbox" value={coin.sort_index} defaultChecked onChange={updateCoins} />
                {coin.name} - [{coin.code}]
            </label>
        )
    })

    const allCoins = followedCoins.concat(unfollowedCoins)

    return (
        <>
            <form className="all-coins">

                {allCoins}
            </form>
        </>
    )
}

export default AllCoins