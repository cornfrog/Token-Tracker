const Model = require("./Model")

class Coin extends Model {
    static get tableName() {
        return "coins"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [
                "CB_id",
                "channel",
                "name",
                "code"
            ],
            properties: {
                CB_id: { type: "integer" },
                channel: { type: "string" },
                name: { type: "string" },
                code: { type: "string" }
            }
        }
    }
}

module.exports = Coin