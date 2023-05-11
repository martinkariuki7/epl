import MatchResults from "../components/MatchResult/MatchResult";

export interface Match {
  acf: {
    matches: {
      home_team: number;
      away_team: number;
      match_date: string;
      match_time: string;
      ispostponed: boolean;
      home_team_goals: string;
      away_team_goals: string;
    }[];
  };
  id: number;
  title: { rendered: string };
}

export interface HandleMatchResults {
  (
    ispostponed: boolean,
    home_team_goals: string,
    match_date: string,
    match_time: string
  ): JSX.Element;
}

export interface HandleTeamName {
  (id: number): JSX.Element | string;
}

interface Props {
  matches: Match[];
  handleTeamName: HandleTeamName;
  handleMatchResults: HandleMatchResults;
}

const Matches = ({
  matches,
  handleTeamName,
  handleMatchResults,
}: Props): JSX.Element => {
  const style1 = {
    padding: "1rem 0",
    width: "min(100% - 2rem, 752px)",
    marginInline: "auto",
  };

  const style2 = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderTop: "1px solid #333",
    borderBottom: "1px solid #333",
    padding: "0 0.5rem",
    width: "min(100% - 2rem, 752px)",
    marginInline: "auto",
  };

  return (
    <div>
      {matches.map(({ acf: { matches }, id, title: { rendered } }) => (
        <div key={id}>
          <div style={style1}>{`${rendered} of 38`}</div>
          <div style={style2}>
            {matches.map(
              ({
                home_team,
                away_team,
                match_date,
                match_time,
                ispostponed,
                home_team_goals,
                away_team_goals,
              }) => (
                <MatchResults
                  key={home_team}
                  homeTeam={home_team}
                  awayTeam={away_team}
                  matchDate={match_date}
                  matchTime={match_time}
                  ispostponed={ispostponed}
                  homeTeamGoals={home_team_goals}
                  awayTeamGoals={away_team_goals}
                  handleTeamName={handleTeamName}
                  handleMatchResults={handleMatchResults}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matches;
