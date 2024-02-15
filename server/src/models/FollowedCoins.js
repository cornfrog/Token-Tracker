const Model = require("./Model");

class FollowedCoin extends Model {
    static get tableName() {
        return "followedCoins"
    }

    static get relationMappings() {
        const { Coin, User } = require("./index.js") 
        return {
            users: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: "followedCoins.userID",
                    to: "users.id"
                }
            },
            coins: {
                relation: Model.HasManyRelation,
                modelClass: Coin,
                join: {
                    from: "followedCoins.coinID",
                    to: "coins.id"
                }
            }
        }
    }
}

module.exports = FollowedCoin