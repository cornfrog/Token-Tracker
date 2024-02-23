import React, { useState } from "react"
import { Link } from "react-router-dom"

const NewsTile = ({ article }) => {
    const [favoritedArticle, setFavoritedState] = useState(false)
    const title = article.title
    const desc = article.description
    const source = article.source
    const url = article.url
    const img = article.urlToImage

    // const favoriteArticle = () => {
    //     //TODO: Add article backend here
    //     setFavoritedState(!favoritedArticle)
    // }

    const goToArticle = () => {
        return window.open(url, '_blank').focus();
    }

    return (
        <div className="article-tile">
            <div className="article-top">
                <p>Source: {source.name}</p>
            </div>
            <div className="article-content" onClick={goToArticle}>
                <img src={img} alt="" className="article-img" />
                <p className="article-desc">{desc}</p>
            </div>
        </div>
    )
}

export default NewsTile