const {
  findUserByIdentifier,
  createUser,
} = require("../../database/mysql/repositories/user.repository");

const registerUser = async (identifier, identifierType) => {
  const existingUser = await findUserByIdentifier(identifier);

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const userId = await createUser(identifier, identifierType);

  return {
    userId,
    identifier,
    identifierType,
  };
};

const loginUser = async (identifier) => {
  const userExist = await findUserByIdentifier(identifier);
  if (!userExist) {
    const error = new Error("User does not exist");
    error.statusCode = 409;
    throw error;
  }
  return userExist;
};

module.exports = {
  registerUser,
  loginUser,
};
