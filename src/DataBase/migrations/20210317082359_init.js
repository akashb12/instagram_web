exports.up = function(knex) {
    return knex.schema.createTable('user',(table) => {
        table.increments();
        table.string('username').notNullable();
        table.string('full_name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.date('dob').notNullable();
        table.string('bio');
        table.string('token');
        table.string('resetId');
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('user')
  };