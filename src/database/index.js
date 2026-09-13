const { connectMySQL } = require("./mysql/connection");

const connectDatabase = async () => {
  return await connectMySQL();
};

module.exports = connectDatabase;
