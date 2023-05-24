import { useState } from "react";
import _ from "lodash";
import { HandleTeamMatches, Team } from "../../App";
import winIcon from "../../assets/win.svg";
import drawIcon from "../../assets/draw.svg";
import lostIcon from "../../assets/lost.svg";
import styles from "./Table.module.css";

interface SortColumn {
  path: string;
  order: boolean | "asc" | "desc";
}

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
  fixtures: any[];
}

const Table = ({ teams, handleTeamMatches, fixtures }: Props) => {
  // Calculate how many matches a team has played
  const getMatchesPlayed = (id: number, array: any[]) => {
    let matchesPlayed = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          if (match.home_team === id || match.away_team === id) {
            matchesPlayed++;
          }
        }
      }
    }

    return matchesPlayed;
  };

  // Calculate a team's overall points
  const getTeamPoints = (id: number, array: any[]) => {
    let points = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          if (homeTeam === id) {
            if (homeGoals > awayGoals) {
              points += 3; // Home team won
            } else if (homeGoals === awayGoals) {
              points += 1; // Home team drew
            }
          } else if (awayTeam === id) {
            if (awayGoals > homeGoals) {
              points += 3; // Away team won
            } else if (homeGoals === awayGoals) {
              points += 1; // Away team drew
            }
          }
        }
      }
    }

    return points;
  };

  // Calculate a team's matches won
  const getMatchesWon = (id: number, array: any[]) => {
    let matchesWon = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          if (homeTeam === id && homeGoals > awayGoals) {
            matchesWon++; // Home team won the match
          } else if (awayTeam === id && awayGoals > homeGoals) {
            matchesWon++; // Away team won the match
          }
        }
      }
    }

    return matchesWon;
  };

  // Calculate a team's matches lost
  const getMatchesLost = (id: number, array: any[]) => {
    let matchesLost = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          if (homeTeam === id && homeGoals < awayGoals) {
            matchesLost++; // Home team lost the match
          } else if (awayTeam === id && awayGoals < homeGoals) {
            matchesLost++; // Away team lost the match
          }
        }
      }
    }

    return matchesLost;
  };

  // Calculate a team's matches drawn
  const getMatchesDrawn = (id: number, array: any[]) => {
    let matchesDrawn = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          if (homeTeam === id && homeGoals === awayGoals) {
            matchesDrawn++; // Match ended in a draw for the home team
          } else if (awayTeam === id && awayGoals === homeGoals) {
            matchesDrawn++; // Match ended in a draw for the away team
          }
        }
      }
    }

    return matchesDrawn;
  };

  // Calculate a teams goals for.
  const getTeamGoalsFor = (id: number, array: any[]) => {
    let goalsFor = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          if (homeTeam === id) {
            goalsFor += homeGoals; // Add home team's goals
          } else if (awayTeam === id) {
            goalsFor += awayGoals; // Add away team's goals
          }
        }
      }
    }

    return goalsFor;
  };

  // Calculate a team's goals conceded
  const getTeamGoalsAgainst = (id: number, array: any[]) => {
    let goalsAgainst = 0;

    for (let i = 0; i < array.length; i++) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = 0; j < matches.length; j++) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          if (homeTeam === id) {
            goalsAgainst += awayGoals; // Add away team's goals
          } else if (awayTeam === id) {
            goalsAgainst += homeGoals; // Add home team's goals
          }
        }
      }
    }

    return goalsAgainst;
  };

  // Get latest match result
  const checkLastFiveGames = (id: number, array: any[]) => {
    const lastFiveGames = [];

    for (let i = array.length - 1; i >= 0; i--) {
      const game = array[i];
      const matches = game.acf.matches;

      for (let j = matches.length - 1; j >= 0; j--) {
        const match = matches[j];

        if (
          !match.ispostponed &&
          match.home_team_goals !== "" &&
          match.away_team_goals !== ""
        ) {
          const homeTeam = match.home_team;
          const awayTeam = match.away_team;
          const homeGoals = parseInt(match.home_team_goals);
          const awayGoals = parseInt(match.away_team_goals);

          let gameResult = null;

          if (homeTeam === id) {
            if (homeGoals > awayGoals) {
              gameResult = <img src={winIcon} alt="win icon" />; // Home team won
            } else if (homeGoals === awayGoals) {
              gameResult = <img src={drawIcon} alt="draw icon" />; // Home team drew
            } else {
              gameResult = <img src={lostIcon} alt="loss icon" />; // Home team lost
            }
          } else if (awayTeam === id) {
            if (awayGoals > homeGoals) {
              gameResult = <img src={winIcon} alt="win icon" />; // Away team won
            } else if (homeGoals === awayGoals) {
              gameResult = <img src={drawIcon} alt="draw icon" />; // Away team drew
            } else {
              gameResult = <img src={lostIcon} alt="loss icon" />; // Away team lost
            }
          }

          if (gameResult !== null) {
            lastFiveGames.push(gameResult);
          }
        }
      }
    }

    return lastFiveGames;
  };

  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "acf.points",
    order: "desc",
  });

  const getColumnValue = (team: Team, column: string) => {
    switch (column) {
      case "acf.matches_played":
        return team.acf.matches_played;
      case "acf.matches_won":
        return team.acf.matches_won;
      case "acf.matches_drawn":
        return team.acf.matches_drawn;
      case "acf.matches_lost":
        return team.acf.matches_lost;
      case "acf.goals_for":
        return team.acf.goals_for;
      case "acf.goals_against":
        return team.acf.goals_against;
      case "acf.goal_difference":
        return team.acf.goal_difference;
      case "acf.points":
        return team.acf.points;
      default:
        return "";
    }
  };

  const sorted = _.orderBy(
    teams,
    [(team) => parseInt(getColumnValue(team, sortColumn.path))],
    [sortColumn.order]
  );

  const handleSort = (path: string) => {
    const newOrder = sortColumn.order === "asc" ? "desc" : "asc";
    setSortColumn({ path, order: newOrder });
  };

  return (
    <table className={`table table-hover ${styles.table}`}>
      <thead>
        <tr>
          <th scope="col">Club</th>
          <th colSpan={8}></th>
          <th
            onClick={() => {
              handleSort("acf.matches_played");
            }}
            scope="col"
          >
            MP
          </th>
          <th
            onClick={() => {
              handleSort("acf.matches_won");
            }}
            scope="col"
          >
            W
          </th>
          <th
            onClick={() => {
              handleSort("acf.matches_drawn");
            }}
            scope="col"
          >
            D
          </th>
          <th
            onClick={() => {
              handleSort("acf.matches_lost");
            }}
            scope="col"
          >
            L
          </th>
          <th
            onClick={() => {
              handleSort("acf.goals_for");
            }}
            scope="col"
          >
            GF
          </th>
          <th
            onClick={() => {
              handleSort("acf.goals_against");
            }}
            scope="col"
          >
            GA
          </th>
          <th
            onClick={() => {
              handleSort("acf.goal_difference");
            }}
            scope="col"
          >
            GD
          </th>
          <th
            onClick={() => {
              handleSort("acf.points");
            }}
            scope="col"
          >
            Pts
          </th>
          <th scope="col" className="d-flex justify-content-center">
            Last 5
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((team: Team, index: number) => {
          const {
            title: { rendered: team_name },
            acf: { team_color },
          } = team;
          return (
            <tr
              key={team.id}
              onClick={() => handleTeamMatches(team.id, team_color, team_name)}
            >
              <th>{index + 1}</th>
              <td className={styles.teamBranding} colSpan={8}>
                <img
                  src={team.fimg_url ? team.fimg_url : ""}
                  alt={team.title.rendered + "logo"}
                />
                {team.title.rendered}
              </td>
              <td>{getMatchesPlayed(team.id, fixtures)}</td>
              <td>{getMatchesWon(team.id, fixtures)}</td>
              <td>{getMatchesDrawn(team.id, fixtures)}</td>
              <td>{getMatchesLost(team.id, fixtures)}</td>
              <td>{getTeamGoalsFor(team.id, fixtures)}</td>
              <td>{getTeamGoalsAgainst(team.id, fixtures)}</td>
              <td>
                {getTeamGoalsFor(team.id, fixtures) -
                  getTeamGoalsAgainst(team.id, fixtures)}
              </td>
              <td>{getTeamPoints(team.id, fixtures)}</td>
              <td className={styles.winDrawLost}>
                <div className="d-flex justify-content-center">
                  {checkLastFiveGames(team.id, fixtures).map(
                    (result, index) => (
                      <span key={index}>{result}</span>
                    )
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
