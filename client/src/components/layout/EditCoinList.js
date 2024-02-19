import React, { useRef, useEffect } from "react"
import FollowedCoins from "./FollowedCoins"
import AllCoins from "./AllCoins"
import { Link, Switch, Route } from "react-router-dom"

const EditCoinList = ({ user }) => {
    const myList = useRef(null)

    useEffect(() => {
        myList.current.focus()
    },[])

    return (
        <>
            <div className="edit-coin-list-buttons">
                <Link className="coin-list-link" to="/my-coins/edit" ref={myList} >My List </Link>
                <Link className="coin-list-link" to="/my-coins/edit/all">All Coins</Link>
            </div>

            <Switch>
                <Route path="/my-coins/edit/all" component={AllCoins} />
                <Route exact path="/my-coins/edit" component={FollowedCoins} />
            </Switch>
        </>
    )
}

export default EditCoinList