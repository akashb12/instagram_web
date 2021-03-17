const {knexSnakeCaseMappers} = require('objection')
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'instagram_clone',
      user:'postgres',
    password:'1AKASHBAN',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory:'./seeds'
    },
    ...knexSnakeCaseMappers
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'instagram_clone',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers
  }

};