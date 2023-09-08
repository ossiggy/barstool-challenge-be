// errors is _errors and save is _save
import { GameStats, PitcherSchemaType } from "../models";
const { getData } = require("./gameData");

interface IFooBar extends IFoo, IBar {}

interface RawPitcherData {
  save: string;
  errors: number;
  [key: string]: any;
}

const cleanPitchers = (pitchers: any) => {
  return pitchers.map((pitcher: RawPitcherData) => {
    const newPitcher: PitcherSchemaType = Object.assign({}, pitcher, {
      _save: pitcher.save,
      _errors: pitcher.errors,
    });
    delete newPitcher.save;
    delete newPitcher.errors;
    return newPitcher;
  });
};

const cleanFielders = (fielders) => {
  return map(fielders, (fielder) => {
    const newFielder = Object.assign({}, fielder, {
      _errors: fielder.errors,
    });
    delete newFielder.errors;
    return newFielder;
  });
};

const cleanData = ({
  feedUrl,
  league,
  officials,
  home_team,
  away_team,
  away_errors,
  home_errors,
  away_batters,
  home_batters,
  away_pitchers,
  home_pitchers,
  away_fielding,
  home_fielding,
  event_information,
  away_batter_totals,
  home_batter_totals,
  away_period_scores,
  home_period_scores,
}) => ({
  feedUrl,
  league,
  away_team,
  home_team,
  away_period_scores,
  home_period_scores,
  stats: {
    away: {
      _errors: away_errors,
      batters: away_batters,
      pitchers: cleanPitchers(away_pitchers),
      fielding: cleanFielders(away_fielding),
    },
    home: {
      _errors: home_errors,
      batters: home_batters,
      pitchers: cleanPitchers(home_pitchers),
      fielding: cleanFielders(home_fielding),
    },
  },
  totals: {
    away_batter_totals,
    home_batter_totals,
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

const update = (params) => {
  const { id, data } = params;
  const cleaned = cleanData(data);
  const updateData = Object.assign({}, cleaned, {
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
    newData.feedUrl = feed;
    return await update({ id, data: newData });
  } catch (err) {
    return err;
  }
};

const create = (params) => {
  return new Game(cleanData(params));
};

module.exports = {
  createMlb: create,
  updateMlb: update,
  cleanMlbData: cleanData,
  cleanPitchers,
  cleanFielders,
  returnUpdatedMlb: returnUpdated,
};
