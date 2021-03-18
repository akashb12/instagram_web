exports.up = function(knex) {
    return knex.schema.createTable('likes',(table) => {
        table.increments();
        table.integer('userId').references('id').inTable('user');
        table.integer('postId').references('id').inTable('posts');
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('likes')
  };