import * as React from "react";

interface Props {
  homeTeam: number;
  awayTeam: number;
  matchDate: string;
  matchTime: string;
  ispostponed: Boolean;
  homeTeamGoals: string;
  awayTeamGoals: string;
  handleTeamName: (num: number) => string | JSX.Element[];
  handleMatchResults: (
    isPostponed: Boolean,
    home_team_goals: string,
    match_date: string,
    match_time: string
  ) => JSX.Element[];
}

const MatchResults = ({
  homeTeam,
  awayTeam,
  homeTeamGoals,
  awayTeamGoals,
  ispostponed,
  matchDate,
  matchTime,
  handleTeamName,
  handleMatchResults,
}: Props) => {
  return (
    <div className="single-match" key={`${homeTeam}-${awayTeam}`}>
      <div className="teams-playing">
        <div className="home-team">
          <span>{handleTeamName(homeTeam)}</span>
          <span
            className={
              homeTeamGoals > awayTeamGoals ? "scores winner" : "scores"
            }
          >
            {homeTeamGoals}
          </span>
        </div>
        <div className="away-team">
          <span>{handleTeamName(awayTeam)}</span>
          <span
            className={
              awayTeamGoals > homeTeamGoals ? "scores winner" : "scores"
            }
          >
            {awayTeamGoals}
          </span>
        </div>
      </div>

      <div className="match-results">
        {handleMatchResults(ispostponed, homeTeamGoals, matchDate, matchTime)}
      </div>
    </div>
  );
};

export default MatchResults;
