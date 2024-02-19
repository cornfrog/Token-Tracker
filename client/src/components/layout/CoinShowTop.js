import React, { useEffect, useState } from "react"

const CoinShowTop = (props) => {
    const coinCode = props.coinCode
    const [coinFollowState, setCoinFollowState] = useState({})

    const fetchCoinFollowState = async () => {
        try {
            const fetchedCoinFollowState = await fetch(`/api/v1/user-coins/following/${coinCode}`)
            const parsedCoinFollowData = await fetchedCoinFollowState.json()
            setCoinFollowState(parsedCoinFollowData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCoinFollowState()
    }, [])


    const updateCoinStatus = async (event) => {
        if (coinFollowState.inUserFollowList) {
            try {
                const unfollowedCoin = await fetch(`/api/v1/user-coins/unfollow/${coinCode}`, {
                    method: "delete",
                    headers: new Headers({ "Content-Type": "application/json" }),
                })
                setCoinFollowState({...coinFollowState, inUserFollowList: false})
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const followedCoin = await fetch(`/api/v1/user-coins/follow/`, {
                    method: "PATCH",
                    headers: new Headers({ "Content-Type": "application/json" }),
                    body: JSON.stringify({ coinToFollow: coinCode })
                })
                setCoinFollowState({...coinFollowState, inUserFollowList: true})
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className="coin-show-top">
            <h1 className="coin-show-name">{coinFollowState.coinName}</h1>
            <button 
                className={coinFollowState.inUserFollowList ? "following-btn" : "follow-btn"} 
                onClick={updateCoinStatus}
            >
                {coinFollowState.inUserFollowList ? "Following" : "Follow"}
            </button>
        </div>
    )
}

export default CoinShowTop