exports.up = function(knex) {
    return knex.schema.createTable('saved_posts',(table) => {
        table.increments();
        table.integer('userId').references('id').inTable('user');
        table.integer('postId').references('id').inTable('posts');
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('saved_posts')
  };