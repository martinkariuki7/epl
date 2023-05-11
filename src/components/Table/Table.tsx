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
}

const Table = ({ teams, handleTeamMatches }: Props) => {
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
            acf: {
              matches_played,
              matches_won,
              matches_drawn,
              matches_lost,
              goals_for,
              goals_against,
              goal_difference,
              points,
              team_color,
            },
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
              <td>{matches_played}</td>
              <td>{matches_won}</td>
              <td>{matches_drawn}</td>
              <td>{matches_lost}</td>
              <td>{goals_for}</td>
              <td>{goals_against}</td>
              <td>{parseInt(goal_difference)}</td>
              <td>{points}</td>
              <td className={styles.winDrawLost}>
                <div className="d-flex justify-content-center">
                  <img src={winIcon} alt="win icon" />
                  <img src={winIcon} alt="win icon" />
                  <img src={winIcon} alt="win icon" />
                  <img src={drawIcon} alt="draw icon" />
                  <img src={lostIcon} alt="lost icon" />
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
