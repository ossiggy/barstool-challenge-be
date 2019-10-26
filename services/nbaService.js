const { Game } = require("../models");
const { getData } = require("./gameData");

const update = params => {
  const { id, data } = params;
  const updateData = Object.assign({}, data, {
    updatedAt: new Date()
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

const returnUpdated = async params => {
  const { id, feed } = params;
  try {
    const newData = await getData(feed);
    return await update({ id, data: newData });
  } catch (err) {
    return err;
  }
};

const cleanData = ({
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
  home_period_scores
}) => {
  return {
    feedUrl,
    league,
    away_team,
    home_team,
    away_period_scores,
    home_period_scores,
    stats: {
      away_stats,
      home_stats
    },
    totals: {
      home_totals,
      away_totals
    },
    eventInfo: event_information,
    officials: officials.map(official => {
      return {
        position: official.position || "",
        first_name: official.first_name,
        last_name: official.last_name
      };
    }),
    updatedAt: new Date()
  };
};

const create = params => {
  return new Game(cleanData(params));
};

module.exports = {
  createNba: create,
  updateNba: update,
  cleanNbaData: cleanData,
  returnUpdatedNba: returnUpdated
};
