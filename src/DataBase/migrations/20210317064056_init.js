
exports.up = function(knex) {
    return knex.schema.createTable('user',(table) => {
        table.increments();
        table.string('username').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.integer('phone').notNullable();
        table.string('password').notNullable();
        table.date('dob').notNullable();
        table.string('bio');
        table.string('token').notNullable();
        table.string('token_exp').notNullable();
        table.string('resetId');
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('user')
  };
