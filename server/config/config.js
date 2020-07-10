let rainPassword = process.env.RAIN_PASSWORD
module.exports = {
  server: {
    username: 'root',
    password: rainPassword,
    database: 'acidrain',
    host: '127.0.0.1',
    dialect: 'mysql'
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
