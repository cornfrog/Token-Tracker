const Model = require("./Model");

class Coin extends Model {
    static get tableName() {
        return "coins"
    }

    static get relationMappings() {
        const { User, FollowedCoin } = require("./index.js")
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "coins.id",
                    through: {
                        from: "followedCoins.coinID",
                        to: "followedCoins.userID"
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Coin