const Model = require("./Model");

class Coin extends Model {
    static get tableName() {
        return "coins"
    }
}

module.exports = Coin