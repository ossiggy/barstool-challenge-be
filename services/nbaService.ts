const { Game } = require("../models");
const { getData } = require("./gameData");

interface OfficialsData {
  position: string;
  first_name: string;
  last_name: string;
}

interface CleanDataArgs {
  feedUrl: string;
  league: string;
  officials: OfficialsData[];
  home_team: string;
  away_team: string;
  home_stats: any;
  away_stats: any;
  home_totals: any;
  away_totals: any;
  event_information: any;
  away_period_scores: any;
  home_period_scores: any;
}

export const cleanData = ({
  feedUrl,
  league,
  officials,
  home_team,
  away_team,
  away_stats,
  home_stats,
  home_totals,
  away_totals,
  event_information,
  away_period_scores,
  home_period_scores,
}: CleanDataArgs) => ({
  feedUrl,
  league,
  away_team,
  home_team,
  away_period_scores,
  home_period_scores,
  stats: {
    away_stats,
    home_stats,
  },
  totals: {
    home_totals,
    away_totals,
  },
  eventInfo: event_information,
  officials: officials.map((official) => {
    return {
      position: official.position || "",
      first_name: official.first_name,
      last_name: official.last_name,
    };
  }),
  updatedAt: new Date(),
});

const update = ({ id, data }: { id: string; data: any }) => {
  console.log("NBA SERVICE UPDATE:", data);
  const updateData = Object.assign({}, data, {
    updatedAt: new Date(),
  });

  return Game.findOneAndUpdate(
    { _id: id },
    { $set: updateData },
    { new: true },
    (err, game) => {
      if (err) {
        return err;
      }
      return game;
    }
  );
};

const returnUpdated = async (params) => {
  const { id, feed } = params;
  try {
    const newData = await getData(feed);
    return await update({ id, data: newData });
  } catch (err) {
    return err;
  }
};

const create = (params) => {
  return new Game(cleanData(params));
};

module.exports = {
  createNba: create,
  updateNba: update,
  cleanNbaData: cleanData,
  returnUpdatedNba: returnUpdated,
};
