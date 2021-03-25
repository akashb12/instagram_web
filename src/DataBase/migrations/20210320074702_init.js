
exports.up = function(knex) {
    return knex.schema.table('user', function(table) {
        table.boolean('is_private').defaultTo(true);
    });
};

exports.down = function(knex) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('is_private');
    });
};
