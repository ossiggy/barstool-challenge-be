const { Game } = require('../models');

const create = ({
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
}) => {
  return new Game({
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
      away_totals,
    },
    eventInfo: event_information,
    officials: officials.map(official => {
      return {
        position: official.position || '',
        first_name: official.first_name,
        last_name: official.last_name
      }
    })
  });
}

module.exports = { create };