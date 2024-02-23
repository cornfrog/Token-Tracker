import React, { useState, useEffect } from "react";
import NewsTile from "./NewsTile";

const NewsIndex = (props) => {
    const [newsIndexPage, setIndexPage] = useState(1)
    const [totalPages, setPageCount] = useState(0)
    const [newsArticles, setNewsArticles] = useState([])

    const getTrendingHeadlines = async () => {
        try {
            const fetchedHeadlines = await fetch(`/api/v1/news/trending/${newsIndexPage}`)
            const parsedHeadlines = await fetchedHeadlines.json()
            if(totalPages === 0) {
                const numberOfPages = Math.ceil(parsedHeadlines.articles.total / parsedHeadlines.articles.articles.length) 
                setPageCount(numberOfPages)
            }
            setNewsArticles(parsedHeadlines.articles.articles)
        } catch (error) {
            console.error(error)
        }
    }

    const getNextPage = () => {
        const pageCount = newsIndexPage + 1
        return setIndexPage(pageCount)
    }

    const getPrevPage = () => {
        const pageCount = newsIndexPage - 1
        return setIndexPage(pageCount)
    }

    useEffect(() => {
        getTrendingHeadlines()
    }, [newsIndexPage])

    const newsIndex = newsArticles.map((article) => {
        return <NewsTile article={article} key={article.url}/>
    })

    let nextBtnDisabled = false
    let prevBtnDisabled = false
    if(newsIndexPage === 1){
        prevBtnDisabled = true
    }
    if(newsIndexPage === totalPages) {
        nextBtnDisabled = true
    }


    return (
        <div className="news-index">
            <h1 className="news-header">Trending News</h1>
            <div className="news-controls">
                <button onClick={getPrevPage} disabled={prevBtnDisabled}>Prev</button>
                <button onClick={getNextPage} disabled={nextBtnDisabled}>Next</button>
            </div>
            {newsIndex}
        </div>
    )
}

export default NewsIndex