import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const CoinIndex = (props) => {
    const [pageNumber, setPageNumber] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [displayedCoins, setDisplayedCoins] = useState({
        total: 0,
        results: []
    })

    const fetchCoinList = async () => {
        try {
            const fetchedCoins = await fetch(`/api/v1/coins/${pageNumber}`)
            const parsedCoinList = await fetchedCoins.json()
            if(pageNumber === 0){
                const numberOfPages = Math.ceil(parsedCoinList.coins.total / parsedCoinList.coins.results.length) - 1
                setPageCount(numberOfPages)
            }
            setDisplayedCoins(parsedCoinList.coins)
        } catch (error) {
            console.error(error)
        }
    }

    const nextPage = () => {
        const incPage = pageNumber + 1
        return setPageNumber(incPage)
    }

    const prevPage = () => {
        const decPage = pageNumber - 1
        return setPageNumber(decPage)
    }

    useEffect(() => {
        fetchCoinList()
    }, [pageNumber])

    const coinList = displayedCoins.results.map((coin) => {
        const coinURL = `/coins/${coin.code}`
        return <Link key={coin.id} to={coinURL} className="link-to-coin">{coin.name} - [{coin.code}]</Link>
    })

    let firstPage = false
    let lastPage = false
    if (pageNumber === 0) {
        firstPage = true
    } else if (pageNumber === pageCount) {
        lastPage = true
    }

    return (
        <>
            <div className="coin-index">
                {coinList}
            </div>
            <div className="coin-index-buttons">
                <button onClick={prevPage} disabled={firstPage} className="active-btn">◄</button>
                <button onClick={nextPage} disabled={lastPage} className="active-btn">►</button>
            </div>
        </>
    )
}

export default CoinIndex