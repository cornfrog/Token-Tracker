const serializeUser = (userData) => {
    const allowedAttributes = [ "username", "email", "createdAt"]
    const serializedUser = {}
    for(const attribute of allowedAttributes){
        serializedUser [attribute] = userData[attribute]
    }
    return serializedUser
}

export default serializeUser