const mysql = require("mysql2/promise");

const config = require("../config");

const pool = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectMySQL = async () => {
  const connection = await pool.getConnection();

  connection.release();

  console.log(`MySQL running on port ${config.mysql.port}`);

  return pool;
};

module.exports = {
  pool,
  connectMySQL,
};
