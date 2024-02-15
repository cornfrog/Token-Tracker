/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("followedCoins", (table) => {
        table.bigIncrements("id");
        table.bigInteger("userID").notNullable().unsigned().index().references("users.id")
        table.bigInteger("coinID").notNullable().unsigned().index().references("coins.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());  
    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("followedCoins")
};
