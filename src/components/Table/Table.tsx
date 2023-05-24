import { useState } from "react";
import _ from "lodash";
import { HandleTeamMatches, Team } from "../../App";
import {
  getMatchesDrawn,
  getMatchesLost,
  getMatchesWon,
  getMatchesPlayed,
  getTeamGoalsFor,
  getTeamGoalsAgainst,
  checkLastFiveGames,
  getTeamPoints,
} from "../../utils/TableStanding";
import styles from "./Table.module.css";

interface sortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
  fixtures: any[];
}

const Table = ({ teams, handleTeamMatches, fixtures }: Props) => {
  const [sortColumn, setSortColumn] = useState<sortColumn>({
    path: "Pts",
    order: "desc",
  });

  const handleSort = (path: string) => {
    if (sortColumn.path === path) {
      // If the same column is clicked, toggle the sorting order
      setSortColumn({
        ...sortColumn,
        order: sortColumn.order === "asc" ? "desc" : "asc",
      });
    } else {
      // If a different column is clicked, set the new sorting path and order
      setSortColumn({
        path,
        order: "asc",
      });
    }
  };

  // Update the JSX for the table headers
  <th onClick={() => handleSort("matchesPlayed")} scope="col">
    MP
  </th>;

  const sorted = _.orderBy(
    teams,
    [
      (team: Team) => {
        // Add the sorting path for matches played
        if (sortColumn.path === "MP") {
          return getMatchesPlayed(team.id, fixtures);
        }

        // Add the sorting path for matches won
        if (sortColumn.path === "W") {
          return getMatchesWon(team.id, fixtures);
        }

        // Add the sorting path for matches drawn
        if (sortColumn.path === "D") {
          return getMatchesDrawn(team.id, fixtures);
        }

        // Add the sorting path for matches lost
        if (sortColumn.path === "L") {
          return getMatchesLost(team.id, fixtures);
        }

        // Add the sorting path for goals for
        if (sortColumn.path === "GF") {
          return getTeamGoalsFor(team.id, fixtures);
        }

        // Add the sorting path for goals against
        if (sortColumn.path === "GA") {
          return getTeamGoalsAgainst(team.id, fixtures);
        }

        // Add the sorting path for goal difference
        if (sortColumn.path === "GD") {
          return (
            getTeamGoalsFor(team.id, fixtures) -
            getTeamGoalsAgainst(team.id, fixtures)
          );
        }

        // Add the sorting path for points
        if (sortColumn.path === "Pts") {
          return getTeamPoints(team.id, fixtures);
        }

        return null;
      },
    ],
    [sortColumn.order]
  );

  return (
    <table className={`table table-hover ${styles.table}`}>
      <thead>
        <tr>
          <th scope="col">Club</th>
          <th colSpan={8}></th>
          <th onClick={() => handleSort("MP")} scope="col">
            MP
          </th>
          <th onClick={() => handleSort("W")} scope="col">
            W
          </th>
          <th onClick={() => handleSort("D")} scope="col">
            D
          </th>
          <th onClick={() => handleSort("L")} scope="col">
            L
          </th>
          <th onClick={() => handleSort("GF")} scope="col">
            GF
          </th>
          <th onClick={() => handleSort("GA")} scope="col">
            GA
          </th>
          <th onClick={() => handleSort("GD")} scope="col">
            GD
          </th>
          <th onClick={() => handleSort("Pts")} scope="col">
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
