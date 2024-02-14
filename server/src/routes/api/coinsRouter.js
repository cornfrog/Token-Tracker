import express from "express"

const coinsRouter = new express.Router()

coinsRouter.get("/default-coins", async (req, res) => {
    const defaultCoins = [
        {
            name: "Bitcoin",
            code: "BTC",
            channel: "BTC-USD"
        },
        {
            name: "Ethereum",
            code: "ETH",
            channel: "ETH-USD"
        },
        {
            name: "Tether",
            code: "USDT",
            channel: "USDT-USD"
        },
        {
            name: "Solana",
            code: "SOL",
            channel: "SOL-USD"
        },
        {
            name: "XRP",
            code: "XRP",
            channel: "XRP-USD"
        }
    ]
    return res.status(200).json({ coinList: defaultCoins})
})

export default coinsRouter