exports.up = function(knex) {
    return knex.schema.createTable('saved_posts',(table) => {
        table.increments();
        table.integer('userId').unsigned() // Add a foreign key (FK)...
        .references('user.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;;
        table.integer('postId').unsigned() // Add a foreign key (FK)...
        .references('posts.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('saved_posts')
  };