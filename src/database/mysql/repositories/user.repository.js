const { pool } = require("../connection");

const {
  createUserQuery,
  findUserByIdentifierQuery,
} = require("../queries/user.query");

const findUserByIdentifier = async (identifier) => {
  const [rows] = await pool.execute(findUserByIdentifierQuery, [identifier]);
  
  return rows[0] || null;
};

const createUser = async (identifier, identifierType) => {
  const [result] = await pool.execute(createUserQuery, [
    identifier,
    identifierType,
  ]);

  return result.insertId;
};

module.exports = {
  findUserByIdentifier,
  createUser,
};
