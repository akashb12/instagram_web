
exports.up = function(knex) {
    return knex.schema.table('user', function(table) {
        table.boolean('isPrivate').defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('isPrivate');
    });
};
