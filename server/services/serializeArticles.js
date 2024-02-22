const serializeArticles = (articles) => {
    const serializedArticles = []
    for(const article of articles) {
        serializedArticles.push(serializeArticle(article))
    }
    return serializedArticles
}

const serializeArticle = (article) => {
    const allowedAttribute = ["title", "description", "source", "url"]
    const serializedArticle = {}
    for (const attribute of allowedAttribute) {
        serializedArticle[attribute] = article[attribute]
    }
    return serializedArticle
}

export default serializeArticles