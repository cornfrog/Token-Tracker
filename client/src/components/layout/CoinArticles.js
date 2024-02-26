import React, { useState, useEffect } from "react"
import NewsTile from "./NewsTile"

const CoinArticles = (props) => {
    const coinCode = props.coinCode
    const [coinArticles, setCoinArticles] = useState({
        articles: [],
        total: 0
    })
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [coinArticlePage, setCoinArticlePage] = useState(1)

    const getCoinArticles = async () => {
        try {
            const fetchedCoinArticles = await fetch(`/api/v1/news/${coinCode}/${coinArticlePage}`)
            const parsedCoinArticles = await fetchedCoinArticles.json()
            if(numberOfPages === 0){
                const numberOfArticlePages = Math.ceil(parsedCoinArticles.articleData.total / parsedCoinArticles.articleData.articles.length)
                setNumberOfPages(numberOfArticlePages)
            }
            setCoinArticles(parsedCoinArticles.articleData)
        } catch (error) {
            console.error(error)
        }
    }

    const coinArticleTiles = coinArticles.articles.map((article) => {
        return <NewsTile article={article} key={article.url}/>
    })

    useEffect(() => {
        getCoinArticles()
    }, [coinArticlePage])

    const showNextPage = () => {
        const newPageNum = coinArticlePage + 1
        return setCoinArticlePage(newPageNum)
    }

    const showPrevPage = () => {
        const newPageNum = coinArticlePage - 1
        return setCoinArticlePage(newPageNum)
    }

    let nextBtnDisabled = false
    let prevBtnDisabled = false
    if(coinArticlePage === 1){
        prevBtnDisabled = true
    }
    if(coinArticlePage === numberOfPages) {
        nextBtnDisabled = true
    }

    return (
        <div className="coin-articles-container">
            <div className="coin-articles-buttons">
                <button onClick={showPrevPage} disabled={prevBtnDisabled} className="article-btn">Prev</button>
                <button onClick={showNextPage} disabled={nextBtnDisabled} className="article-btn">Next</button>
            </div>
            <h1 className="article-list-header">News</h1>
            {coinArticleTiles}
        </div>
    )
}

export default CoinArticles