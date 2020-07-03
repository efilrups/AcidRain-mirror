let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  development: {
    username: 'root',
    password: rainPassword,
    database: 'acidrain',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'qkr95162',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: 'qkr95162',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
