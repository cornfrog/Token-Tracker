import React, { useEffect } from "react"
import TickerTile from "./TickerTile"

const TickerList = (props) => {
    const defaultCoins = [
        {
            id: "BTC",
            name: "Bitcoin",
            channel: "BTC-USD"
        },
        {
            id: "ETH",
            name: "Ethereum",
            channel: "ETH-USD"
        },
        {
            id: "SOL",
            name: "Solana",
            channel: "SOL-USD"
        }
    ]

    const getCoins = async () => {
        try{
            const currencyListFetch = await fetch("https://api.coinbase.com/v2/currencies/crypto")
            const parsedCurrencyList = await currencyListFetch.json()
            const arrayOfCoins = parsedCurrencyList.data
            console.log(arrayOfCoins[0])
            const defaultCoins = arrayOfCoins.map((coin) => {
                return {
                    name: coin.name,
                    code: coin.code,
                    CB_id: coin.sort_index,
                    channel: `${coin.code}-USD`
                }
            })
            console.log("default list of coins: ", defaultCoins)

        } catch (error){
            console.log(error)
        }
    }

    const tickerList = defaultCoins.map((coin) => {
        return <TickerTile channel={coin.channel} coinName={coin.name} key={coin.id}/>
    })


    useEffect(() => {
        getCoins()
    }, [])

    return (
        <div className="ticker-list">
            {tickerList}
        </div>
    )
}

export default TickerList