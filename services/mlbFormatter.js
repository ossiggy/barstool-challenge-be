// errors is _errors and save is _save
const { Game } = require('../models');

const cleanPitchers = (pitchers) => {
  return pitchers.map(pitcher => {
    delete Object.assign(pitcher, { _errors: pitcher.errors })[pitcher.errors];
    delete Object.assign(pitcher, { _save: pitcher.save })[pitcher.save];
  })
};

const cleanFielders = (fielders) => {
  return fielders.map(fielder => {
    delete Object.assign(fielder, { _errors: fielder.errors })[fielder.errors];
  })
}

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
}) => {
  return {
    feedUrl,
    league,
    away_team,
    home_team,
    away_period_scores,
    home_period_scores,
    stats: {
      away_errors,
      home_errors,
      away_batters,
      home_batters,
      away_pitchers: cleanPitchers(away_pitchers),
      home_pitchers: cleanPitchers(home_pitchers),
      away_fielding: cleanFielders(away_fielding),
      home_fielding: cleanFielders(home_fielding),
    },
    totals: {
      away_batter_totals,
      home_batter_totals,
    },
    eventInfo: event_information,
    officials: officials.map(official => {
      return {
        position: official.position || '',
        first_name: official.first_name,
        last_name: official.last_name
      }
    })
  };
};

const update = (params) => {
  const { id, data } = params;
  const cleaned = cleanData(data);
  const updateData = Object.assign({}, cleaned, {
    updatedAt: new Date()
  });

  return Game
  .findOneAndUpdate(
    {_id: id}, 
    {$set: updateData}, 
    {new: true}, 
    (err, game) => {
    if (err) {
      return err;
    }
    return game;
  });
};

const returnUpdated = async (params) => {
  const { id, feed } = params;
  try {
    const newData = await getData(feed);
    return await update({id, data: newData});
  } catch (err) {
    return err;
  };
};

const create = (params) => {
  return new Game(cleanData(params));
};

module.exports = {
  createMlb: create,
  updateMlb: update,
  returnUpdatedMlb: returnUpdated,
};
