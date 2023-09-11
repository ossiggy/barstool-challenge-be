export const PORT = process.env.PORT || 8080;
export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://localhost:3000";
export const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/scoreboard-be";
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/scoreboard-be-test";
export const JWT_SECRET = process.env.JWT_SECRET || "PROJECT_AW_ULTRA";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "1d";
