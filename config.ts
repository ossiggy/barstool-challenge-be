export const PORT = process.env.PORT || 8080;
export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://localhost:3000";
export const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1/scoreboard-be";
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://127.0.0.1/scoreboard-be-test";
export const JWT_SECRET = process.env.JWT_SECRET || "PROJECT_AW_ULTRA";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "1d";
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
export const MAX_BURST = Number(process.env.MAX_BURST) || 30;
export const FILL_RATE_PER_SECOND =
  Number(process.env.FILL_RATE_PER_SECOND) || 0.16;
