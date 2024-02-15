/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email", "username"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],

      properties: {
        username: { type: "string" },
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  async $beforeInsert() {
    await this.$checkUniqueness("username")
    return this.$checkUniqueness("email");
  }

  async $beforeUpdate() {
    await this.$checkUniqueness("username")
    return this.$checkUniqueness("email");
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings() {
    const { Coin, FollowedCoin } = require("./index.js")
    return {
      coins: {
        relation: Model.ManyToManyRelation,
        modelClass: Coin,
        join: {
          from: "users.id",
          through: {
            from: "followedCoins.userID",
            to: "followedCoins.coinID"
          },
          to: "coins.id"
        }
      }
    }
  }
}

module.exports = User;
