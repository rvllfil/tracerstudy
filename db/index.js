const Pool = require('pg').Pool
const config = require('config')

pool = new Pool({
  user: config.get('dbConfig').user,
  password: config.get('dbConfig').password,
  database: config.get('dbConfig').database,
  host: config.get('dbConfig').host,
  port: config.get('dbConfig').port
})

module.exports = pool