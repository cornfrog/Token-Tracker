import React, { useState } from "react"
import { Link } from "react-router-dom"

const NewsTile = ({ article }) => {
    const [favoritedArticle, setFavoritedState] = useState(false)
    const title = article.title
    const desc = article.description
    const source = article.source
    const url = article.url
    let img = article.urlToImage

    const goToArticle = () => {
        return window.open(url, '_blank').focus();
    }

    return (
        <div className="article-tile">
            <div className="article-top">
                <p className="article-title">Source: {source.name}</p>
            </div>
            <div className="article-content" onClick={goToArticle}>
                <img src={img !== null ? img : "https://i.imgur.com/ZcbrVe3.jpeg"} alt="" className="article-img" />
                <p className="article-desc">{desc}</p>
            </div>
        </div>
    )
}

export default NewsTile