const dotenv = require("dotenv");

const environment = process.env.NODE_API_ENV || "dev";

dotenv.config({
  path: `.env.${environment}`,
});

const app = require("./src/gateway/gateway");
const connectDatabase = require("./src/database/index");

const PORT = process.env.NODE_API_PORT || 3000;

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Node Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
