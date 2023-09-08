export { getGameData } from "./gameData.js";
const {
  createNba,
  updateNba,
  cleanNbaData,
  returnUpdatedNba,
} = require("./nbaService");
const {
  createMlb,
  updateMlb,
  cleanMlbData,
  cleanPitchers,
  cleanFielders,
  returnUpdatedMlb,
} = require("./mlbService");
