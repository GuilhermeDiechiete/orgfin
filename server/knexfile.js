
module.exports = {

    client: 'postgresql',
    connection: {
      database: 'financial',
      user: 'postgres',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    }
  };
