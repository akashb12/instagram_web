
exports.up = function(knex) {
    return knex.schema.table('user', function(table) {
        table.index('username')
    });
};

exports.down = function(knex) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('username')
    });
};
