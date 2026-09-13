const createUserQuery = `
  INSERT INTO users (
    identifier,
    identifier_type
  )
  VALUES (?, ?)
`;

const findUserByIdentifierQuery = `
  SELECT *
  FROM users
  WHERE identifier = ?
  LIMIT 1
`;

module.exports = {
  createUserQuery,
  findUserByIdentifierQuery
};
