
exports.up = function(knex) {
    return knex.schema.table('user', function(table) {
        table.string('profileImage');
    });
};

exports.down = function(knex) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('profileImage');
    });
};
