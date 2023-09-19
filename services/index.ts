import axios from "axios";
import { GameStats } from "../models";
import { formatData } from "../helpers";
import {
  GetGameData,
  UpdateGameInfo,
  ReturnUpdatedGameInfo,
  CreateGameInfo,
} from "./types";

export const getGameData: GetGameData = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateGameInfo: UpdateGameInfo = async (id, data) => {
  try {
    const updateData = Object.assign({}, data, {
      updatedAt: new Date(),
    });

    const updated = await GameStats.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    return updated?.apiRepr();
  } catch (err) {
    return err;
  }
};

export const returnUpdatedGameInfo: ReturnUpdatedGameInfo = async (
  id,
  feed
) => {
  try {
    const newData = await getGameData(feed);
    return await updateGameInfo(id, newData);
  } catch (err) {
    return err;
  }
};

export const createGameInfo: CreateGameInfo = async (params) => {
  try {
    const game = formatData(params);
    const results = await GameStats.create(game);
    return results.apiRepr();
  } catch (err) {
    console.error(err);
    return err;
  }
};
