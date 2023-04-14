import { useState } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

interface SortColumn {
  path: string;
  order: boolean | "asc" | "desc";
}

const Table = ({ teams, handleTeamMatches }: any) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    path: "acf.points",
    order: "desc",
  });

  const getColumnValue = (team: any, column: string) => {
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
    <table className="table table-hover">
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
        {sorted.map((team: any, index: number) => {
          const { acf } = team;
          return (
            <tr key={team.id} onClick={() => handleTeamMatches(team.id)}>
              <th>{index + 1}</th>
              <td className="team-branding" colSpan={8}>
                <img
                  src={team.fimg_url ? team.fimg_url : ""}
                  alt={team.title.rendered + "logo"}
                />
                {team.title.rendered}
              </td>
              <td>{acf.matches_played}</td>
              <td>{acf.matches_won}</td>
              <td>{acf.matches_drawn}</td>
              <td>{acf.matches_lost}</td>
              <td>{acf.goals_for}</td>
              <td>{acf.goals_against}</td>
              <td>{parseInt(acf.goal_difference)}</td>
              <td>{acf.points}</td>
              <td className="win-draw-lost">
                <div className="d-flex justify-content-center">
                  <img src="/win.svg" alt="win icon" />
                  <img src="/win.svg" alt="win icon" />
                  <img src="/win.svg" alt="win icon" />
                  <img src="/draw.svg" alt="draw icon" />
                  <img src="/lost.svg" alt="lost icon" />
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
