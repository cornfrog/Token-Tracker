import React, { useState, useEffect } from "react"

import NewsTile from "./NewsTile"

const NewsList = (props) => {
    const [articleList, setArticleList] = useState([])

    const fetchArticles = async () => {
        try {
            const newsArticleFetch = await fetch("/api/v1/news/")
            const parsedArticles = await newsArticleFetch.json()
            setArticleList(parsedArticles.articleData.articles)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])


    const articleTiles = articleList.map((article) => {
        return <NewsTile article={article} key={article.url}/>
    })

    return (
        <div className="news-list">
            <h1 className="article-header">Related Articles</h1>
            <div>
                {articleTiles}
            </div>
        </div>
    )
}

export default NewsList