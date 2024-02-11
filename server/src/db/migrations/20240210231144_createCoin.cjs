/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("coins", (table) => {
        table.bigIncrements("id")
        table.integer("CB_id").notNullable()
        table.string("channel").notNullable()
        table.string("name").notNullable()
        table.string("code").notNullable()
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
