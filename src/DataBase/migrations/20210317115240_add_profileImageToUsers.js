
exports.up = function(knex) {
    return knex.schema.table('user', function(table) {
        table.string('profile_image');
    });
};

exports.down = function(knex) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('profile_image');
    });
};
