let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  service: {
    username: 'username',
    password: rainPassword,
    database: 'acidrain',
    host: 'database.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:3306
  },
  development: {
    username: 'master',
    password: rainPassword,
    database: 'acidrain',
    host: 'codestates.cp4moavvfqze.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port:13306
  },
}
