import React, { useState, useEffect } from "react"
import CoinShowTop from "./CoinShowTop"
import CoinArticles from "./CoinArticles"
import CoinShowData from "./CoinShowData"

const CoinShowPage = (props) => {
    const coinCode = props.match.params.coinCode
    const channel = `${coinCode}-USD`

    return (
        <>
            <CoinShowTop coinCode={coinCode} />
            <CoinShowData channel={channel} />
            <CoinArticles coinCode={coinCode} />
        </>
    )
}

export default CoinShowPage