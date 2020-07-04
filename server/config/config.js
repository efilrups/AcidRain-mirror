let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  development: {
    username: 'username',
    password: rainPassword,
    database: 'acidrain',
    host: 'database.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306
  },
  test: {
    username: 'root',
    password: rainPassword,
    database: 'acidrain',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
}
