let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  production1: {
    username: 'username',
    password: rainPassword,
    database: 'acidrain',
    host: 'database.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306
  },
  development: {
    username: 'root',
    password: 'qkr95162',
    database: 'acidrain',
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
