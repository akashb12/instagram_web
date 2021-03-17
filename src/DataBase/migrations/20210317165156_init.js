exports.up = function(knex) {
    return knex.schema.createTable('posts',(table) => {
        table.increments();
        table.string('caption').notNullable();
        table.specificType('attachment_url', 'text ARRAY').notNullable();
        table.specificType('tagged_users', 'text ARRAY');
        table.boolean('commentsEnabled').defaultTo(true);
        table.boolean('archive').defaultTo(false);
        table.integer('userId').references('id').inTable('user');
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('posts')
  };