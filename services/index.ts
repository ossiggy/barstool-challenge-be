import { GameStats } from "../models";
import { formatData, getGameData } from "../helpers";
import type { MlbGameStatsProps, NbaGameStatsProps } from "../helpers/types";

export const updateGameInfo = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  try {
    const updateData = Object.assign({}, data, {
      updatedAt: new Date(),
    });

    return await GameStats.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );
  } catch (err) {}
};

export const returnUpdatedGameInfo = async ({
  id,
  feed,
}: {
  id: string;
  feed: string;
}) => {
  try {
    const newData = await getGameData(feed);
    return await updateGameInfo({ id, data: newData });
  } catch (err) {
    return err;
  }
};

export const createGameInfo = async (
  params: MlbGameStatsProps | NbaGameStatsProps
) => {
  try {
    const game = formatData(params);
    return await GameStats.create(game);
  } catch (err: unknown) {
    console.error(err);
    return err;
  }
};
