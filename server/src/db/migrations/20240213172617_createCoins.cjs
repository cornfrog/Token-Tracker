/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("coins", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("code").notNullable()
        table.string("sort_index").notNullable()
        table.string("channel").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());  
    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("coins")
};
