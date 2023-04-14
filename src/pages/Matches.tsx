import * as React from "react";
import MatchResults from "../components/MatchResult";

export interface Match {
  acf: {
    matches: {
      home_team: number;
      away_team: number;
      match_date: string;
      match_time: string;
      ispostponed: Boolean;
      home_team_goals: string;
      away_team_goals: string;
    }[];
  };
  id: number;
  title: { rendered: string };
}

interface Props {
  matches: Match[];
  handleTeamName: (num: number) => string | JSX.Element[];
  handleMatchResults: (
    isPostponed: Boolean,
    home_team_goals: string,
    match_date: string,
    match_time: string
  ) => JSX.Element[];
}

const Matches = ({ matches, handleTeamName, handleMatchResults }: Props) => {
  return matches.map(({ acf: { matches }, id, title: { rendered } }) => (
    <div key={id}>
      <div className="my-container matchday-title">{`${rendered} of 38`}</div>
      <div className="my-container matches-wrapper">
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
  ));
};

export default Matches;
