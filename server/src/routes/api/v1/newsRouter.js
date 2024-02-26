import express from "express"
import got from "got";
import dotenv from "dotenv";
dotenv.config();

import { User, Coin } from "../../../models/index.js"
import serializeArticles from "../../../../services/serializeArticles.js";
import formatArticleQuery from "../../../../services/formatArticleQuery.js";

const newsRouter = new express.Router()
const NEWS_API_KEY = process.env.NEWS_BACKUP

newsRouter.get("/", async (req, res) => {
    if(req.user){
        try {
            const userID = req.user.id
            const user = await User.query().findById(userID)
            const userFollowedCoins = await user.$relatedQuery("coins")
            const articleQuery = formatArticleQuery(userFollowedCoins)
            const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${articleQuery}&apiKey=${NEWS_API_KEY}&pageSize=5&sortBy=relevancy&language=en`
            const fetchedArticles = await got(NEWS_API_URL)
            const parsedArticles = JSON.parse(fetchedArticles.body)
            const articleData = {
                total: parsedArticles.totalResults,
                articles: parsedArticles.articles
            }
            articleData.articles = serializeArticles(articleData.articles)
            return res.status(200).json({ articleData })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ errors: error })
        }
    } else {
        try {
            const NEWS_API_URL = `https://newsapi.org/v2/everything?q=(crypto AND coinbase)&apiKey=${NEWS_API_KEY}&pageSize=5&sortBy=relevancy&language=en`
            const fetchedArticles = await got(NEWS_API_URL)
            const parsedArticles = JSON.parse(fetchedArticles.body)
            const articleData = {
                total: parsedArticles.totalResults,
                articles: parsedArticles.articles
            }
            articleData.articles = serializeArticles(articleData.articles)
            return res.status(200).json({ articleData })
        } catch (error) {
            return res.status(500).json({errors: error})
        }
    }
})

newsRouter.get("/trending/:pageCount", async (req, res) => {
    const pageCount = req.params.pageCount
    try {
        const NEWS_API_URL = `https://newsapi.org/v2/everything?q=(crypto OR blockchain)&apiKey=${NEWS_API_KEY}&pageSize=5&page=${pageCount}&sortBy=popularity&language=en`
        const fetchedArticles = await got(NEWS_API_URL)
        const parsedArticles = JSON.parse(fetchedArticles.body)
        const articleData = {
            total: parsedArticles.totalResults,
            articles: parsedArticles.articles
        }
        articleData.articles = serializeArticles(articleData.articles)        
        return res.status(200).json({articles: articleData})
    } catch (error) {
        return res.status(200).json({errors: error})
    }
})

newsRouter.get("/:code/:pageCount", async (req,res) => {
    const coinCode = req.params.code
    const pageCount = req.params.pageCount
    try {
        const coin = await Coin.query().findOne({code: coinCode})
        const coinName = coin.name
        const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${coinName}&apiKey=${NEWS_API_KEY}&pageSize=5&page=${pageCount}&sortBy=popularity&language=en`
        const fetchedArticles = await got(NEWS_API_URL)
        const parsedArticles = JSON.parse(fetchedArticles.body)
        const articleData = {
            total: parsedArticles.totalResults,
            articles: parsedArticles.articles
        }
        articleData.articles = serializeArticles(articleData.articles)
        return res.status(200).json({ articleData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors: error})
    }
})


export default newsRouter