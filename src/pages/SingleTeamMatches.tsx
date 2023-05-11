import { Dispatch, SetStateAction } from "react";
import { Match, HandleMatchResults, HandleTeamName } from "./Matches";
import MatchResults from "../components/MatchResult/MatchResult";

interface Props {
  matches: Match[];
  teamId: number;
  setMatches: Dispatch<SetStateAction<Match[]>>;
  handleTeamName: HandleTeamName;
  handleMatchResults: HandleMatchResults;
}

interface SingleMatch {
  home_team: number;
  home_team_goals: string;
  away_team: number;
  away_team_goals: string;
  ispostponed: boolean;
  match_date: string;
  match_time: string;
}

const SingleTeamMatches = ({
  matches,
  teamId,
  handleTeamName,
  handleMatchResults,
}: Props) => {
  const allMatches: SingleMatch[] = [];

  // Gather all matches into a simple array
  matches.forEach((matchDay) => {
    if (Array.isArray(matchDay.acf.matches)) {
      matchDay.acf.matches.forEach((match): void => {
        if (match.home_team === teamId || match.away_team === teamId)
          allMatches.push(match);
      });
    }
  });

  const styles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderTop: "1px solid #333",
    borderBottom: "1px solid #333",
    padding: "0 0.5rem",
    width: "min(100% - 2rem, 752px)",
    marginInline: "auto",
  };

  return (
    <div style={styles}>
      {allMatches.map((match) => (
        <MatchResults
          key={allMatches.indexOf(match)}
          homeTeam={match.home_team}
          awayTeam={match.away_team}
          matchDate={match.match_date}
          matchTime={match.match_time}
          ispostponed={match.ispostponed}
          homeTeamGoals={match.home_team_goals}
          awayTeamGoals={match.away_team_goals}
          handleTeamName={handleTeamName}
          handleMatchResults={handleMatchResults}
        />
      ))}
    </div>
  );
};

export default SingleTeamMatches;
