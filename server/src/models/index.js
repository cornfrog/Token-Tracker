// include all of your models here using CommonJS requires
const User = require("./User.js");
const Coin = require("./Coin.js")
const FollowedCoin = require("./FollowedCoins.js")

module.exports = { User, Coin, FollowedCoin };
