
exports.up = function(knex) {
    return knex.schema.createTable("cars", (tbl) => {
        tbl.increments();
        tbl.integer("Year", 255).notNullable();
        tbl.string("Make", 255).notNullable();
        tbl.string("Model", 255).unique().notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
