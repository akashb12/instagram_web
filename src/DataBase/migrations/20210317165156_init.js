exports.up = function(knex) {
    return knex.schema.createTable('posts',(table) => {
        table.increments();
        table.text('caption').notNullable();
        table.text('attachment_url').notNullable();
        table.specificType('tagged_users', 'text ARRAY');
        table.boolean('comments_enabled').defaultTo(true);
        table.boolean('archive').defaultTo(false);
        table.integer('user_id').index() // Add a foreign key (FK)...
        .references('user.id') // ...which references Article PK.
        .onUpdate('CASCADE') // If Article PK is changed, update FK as well.
        .onDelete('CASCADE') ;
        table.timestamps(true,true)
    })
  };

  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('posts')
  };