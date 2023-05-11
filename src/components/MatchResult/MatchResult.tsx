import { HandleMatchResults, HandleTeamName } from "../../pages/Matches";
import styles from "./MatchResult.module.css";

interface Props {
  homeTeam: number;
  awayTeam: number;
  matchDate: string;
  matchTime: string;
  ispostponed: boolean;
  homeTeamGoals: string;
  awayTeamGoals: string;
  handleTeamName: HandleTeamName;
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
    <div className={styles.singleMatch} key={`${homeTeam}-${awayTeam}`}>
      <div className={styles.teamsPlaying}>
        <div className={styles.homeTeam}>
          <span>{handleTeamName(homeTeam)}</span>
          <span
            className={
              homeTeamGoals > awayTeamGoals
                ? [styles.scores, styles.winner].join(" ")
                : styles.scores
            }
          >
            {homeTeamGoals}
          </span>
        </div>
        <div className={styles.awayTeam}>
          <span>{handleTeamName(awayTeam)}</span>
          <span
            className={
              awayTeamGoals > homeTeamGoals
                ? [styles.scores, styles.winner].join(" ")
                : styles.scrores
            }
          >
            {awayTeamGoals}
          </span>
        </div>
      </div>

      <div className={styles.matchResults}>
        {handleMatchResults(ispostponed, homeTeamGoals, matchDate, matchTime)}
      </div>
    </div>
  );
};

export default MatchResults;
