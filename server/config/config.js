let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  development: {
    username: 'username',
    password: 'qkr95162',
    database: 'acidrain',
    host: 'database.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306
  },
  service: {
    username: 'master',
    password: 'qkr95162',
    database: 'acidrain',
    host: 'codestates.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:13306
  },
}
