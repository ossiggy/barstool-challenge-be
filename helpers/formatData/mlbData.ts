import {
  PitcherSchemaType,
  FielderSchemaType,
  MlbSchemaBaseProps,
} from "../../models";

const cleanPitchers = (pitchers: PitcherSchemaType[]) => {
  return pitchers.map((pitcher) => {
    const newPitcher: PitcherSchemaType = Object.assign({}, pitcher, {
      _save: pitcher.save,
      _errors: pitcher.errors,
    });
    delete newPitcher.save;
    delete newPitcher.errors;
    return newPitcher;
  });
};

const cleanFielders = (fielders: FielderSchemaType[]) => {
  return fielders.map((fielder) => {
    const newFielder = Object.assign({}, fielder, {
      _errors: fielder.errors,
    });
    delete newFielder.errors;
    return newFielder;
  });
};

export const formatMlbData = ({
  away_errors,
  home_errors,
  away_batters,
  home_batters,
  away_pitchers,
  home_pitchers,
  away_fielding,
  home_fielding,
  away_batter_totals,
  home_batter_totals,
}: MlbSchemaBaseProps) => {
  return {
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
  };
};
