import express from "express";
import mongoose, { ConnectOptions, MongooseError } from "mongoose";
import { dbConnect, mongoOptions } from "./db-mongoose";
import { apiRouter } from "./routes";
import { rateLimitByIp } from "./middleware";
import { PORT, DATABASE_URL, MAX_BURST, FILL_RATE_PER_SECOND } from "./config";

export const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", rateLimitByIp(MAX_BURST, FILL_RATE_PER_SECOND), apiRouter);

let server: any;

export const runServer = async (
  databaseUrl = DATABASE_URL,
  port = PORT
): Promise<void> => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await mongoose.connect(databaseUrl, mongoOptions as ConnectOptions);

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      });

      server.on("error", (err: MongooseError) => {
        mongoose.disconnect();
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const closeServer = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    await new Promise<void>((resolve, reject) => {
      console.log("Closing server");
      server.close((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

if (require.main === module) {
  dbConnect(DATABASE_URL);
  runServer();
}
