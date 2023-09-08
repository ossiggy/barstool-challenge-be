import express from "express";
import mongoose, { ConnectOptions, MongooseError } from "mongoose";

import { dbConnect, mongoOptions } from "./db-mongoose";
import { PORT, DATABASE_URL } from "./config";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/nba/", nbaRouter);
app.use("/mlb/", mlbRouter);

let server: any;

export const runServer = (databaseUrl = DATABASE_URL, port = PORT) => {
  return new Promise<void>((resolve, reject) => {
    mongoose
      .connect(databaseUrl, mongoOptions as ConnectOptions)
      .catch((err: MongooseError) => reject(err));
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on("error", (err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

export const closeServer = () => {
  return mongoose.disconnect().then(() => {
    return new Promise<void>((resolve, reject) => {
      console.log("Closing server");
      return server.close((err: any) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
};

if (require.main === module) {
  dbConnect(DATABASE_URL);
  runServer();
}
