import React, { useState } from "react"
import { Link } from "react-router-dom"

const NewsTile = ({ article }) => {
    const [favoritedArticle, setFavoritedState] = useState(false)
    const title = article.title
    const desc = article.description
    const source = article.source
    const url = article.url

    const favoriteArticle = () => {
        //TODO: Add article backend here
        setFavoritedState(!favoritedArticle)
    }

    return (
        <div className="article-tile">
            <div className="article-top">
                <a href={url} className="article-title" target="_blank">{title}</a>
                <button onClick={favoriteArticle} className={favoritedArticle ? "favorited" : "unfavorited"}>★</button>
            </div>
            <p>{desc}</p>
            <p>Source: {source.name}</p>
        </div>
    )
}

export default NewsTile