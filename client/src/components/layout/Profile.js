import React, { useState, useEffect } from "react"
import { Link, Switch, Route } from "react-router-dom"
import FollowedCoins from "./FollowedCoins"
import FavoritedArticles from "./FavoritedArticles"

const Profile = ({ user }) => {
    const [userData, setUserData] = useState({
        userData: {
            username: "",
            email: "",
            createdAt: ""
        },
    })
    const userID = user.id

    const getUserData = async () => {
        try {
            const fetchedUserData = await fetch(`/api/v1/users/${userID}`)
            const parsedFetchedUserData = await fetchedUserData.json()
            setUserData(parsedFetchedUserData)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    const formattedDate = (userCreatedDate) => {
        const newDate = new Date(userCreatedDate)
        const formattedUserDate = newDate.toLocaleDateString()
        return formattedUserDate
    }

    return (
        <>
            <div className="user-data">
                <header className="user-data-header">My Data:</header>
                <p>Username: {userData.userData.username}</p>
                <p>Email: {userData.userData.email}</p>
                <p>User Since: {formattedDate(userData.userData.createdAt)} </p>
            </div>
            <div className="profile-links">
                <Link className="profile-data-link" to="/profile/my-coins">My Coins </Link>
            </div>
            <Switch>
                <Route exact path="/profile/my-coins" component={FollowedCoins} />
            </Switch>
        </>
    )
}

export default Profile 