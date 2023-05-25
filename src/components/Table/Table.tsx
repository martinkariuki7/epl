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
import { Match } from "../../pages/Matches";
import styles from "./Table.module.css";

interface sortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
  fixtures: Match[];
}

const Table = ({ teams, handleTeamMatches, fixtures }: Props) => {
  const [sortColumn, setSortColumn] = useState<sortColumn>({
    path: "Pts",
    order: "desc",
  });

  const handleSort = (path: string) => {
    if (sortColumn.path === path) {
      setSortColumn({
        ...sortColumn,
        order: sortColumn.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortColumn({
        path,
        order: "asc",
      });
    }
  };

  // Ugly code, consider refactoring
  const sorted = _.orderBy(
    teams,
    [
      (team: Team) => {
        if (sortColumn.path === "MP") {
          return getMatchesPlayed(team.id, fixtures);
        }

        if (sortColumn.path === "W") {
          return getMatchesWon(team.id, fixtures);
        }

        if (sortColumn.path === "D") {
          return getMatchesDrawn(team.id, fixtures);
        }

        if (sortColumn.path === "L") {
          return getMatchesLost(team.id, fixtures);
        }

        if (sortColumn.path === "GF") {
          return getTeamGoalsFor(team.id, fixtures);
        }

        if (sortColumn.path === "GA") {
          return getTeamGoalsAgainst(team.id, fixtures);
        }

        if (sortColumn.path === "GD") {
          return (
            getTeamGoalsFor(team.id, fixtures) -
            getTeamGoalsAgainst(team.id, fixtures)
          );
        }

        if (sortColumn.path === "Pts") {
          return getTeamPoints(team.id, fixtures);
        }

        return null;
      },
    ],
    [sortColumn.order]
  );

  return (
    <div className="table-responsive">
      <table className={`table table-hover ${styles.table}`}>
        <thead>
          <tr>
            <th></th>
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
            let columnBadge = "";

            if (index < 4) {
              columnBadge = styles.championsLeague;
            } else if (index >= sorted.length - 3) {
              columnBadge = styles.relegation;
            } else if (index === 4 || index === 5) {
              columnBadge = styles.europa;
            } else if (index === 6) {
              columnBadge = styles.conferenceLeague;
            }

            return (
              <tr
                key={team.id}
                onClick={() =>
                  handleTeamMatches(team.id, team_color, team_name)
                }
              >
                <th>
                  <div className={columnBadge}></div>
                </th>
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
    </div>
  );
};

export default Table;
