exports.up = function(knex) {
    return knex.schema.createTable('replies',(table) => {
        table.increments();
        table.string('reply').notNullable();
        table.integer('userId').unsigned() // Add a foreign key (FK)...
        .references('user.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.integer('postId').unsigned() // Add a foreign key (FK)...
        .references('posts.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.integer('commentId').unsigned() // Add a foreign key (FK)...
        .references('comments.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('replies')
  };