import { HandleMatchResults } from "../pages/Matches";

interface Props {
  homeTeam: number;
  awayTeam: number;
  matchDate: string;
  matchTime: string;
  ispostponed: boolean;
  homeTeamGoals: string;
  awayTeamGoals: string;
  handleTeamName: (num: number) => JSX.Element | string;
  handleMatchResults: HandleMatchResults;
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
