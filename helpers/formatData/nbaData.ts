import type { NbaSchemaBaseProps } from "../../models";

export const formatNbaData = ({
  away_stats,
  home_stats,
  home_totals,
  away_totals,
}: NbaSchemaBaseProps) => {
  return {
    stats: {
      away: away_stats,
      home: home_stats,
    },
    totals: {
      away: away_totals,
      home: home_totals,
    },
  };
};
