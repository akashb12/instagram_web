exports.up = function(knex) {
    return knex.schema.createTable('likes',(table) => {
        table.increments();
        table.integer('user_id').index() // Add a foreign key (FK)...
        .references('user.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;;
        table.integer('post_id').index() // Add a foreign key (FK)...
        .references('posts.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('likes')
  };