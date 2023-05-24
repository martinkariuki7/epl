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

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
  fixtures: any[];
}

const Table = ({ teams, handleTeamMatches, fixtures }: Props) => {
  return (
    <table className={`table table-hover ${styles.table}`}>
      <thead>
        <tr>
          <th scope="col">Club</th>
          <th colSpan={8}></th>
          <th scope="col">MP</th>
          <th scope="col">W</th>
          <th scope="col">D</th>
          <th scope="col">L</th>
          <th scope="col">GF</th>
          <th scope="col">GA</th>
          <th scope="col">GD</th>
          <th scope="col">Pts</th>
          <th scope="col" className="d-flex justify-content-center">
            Last 5
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team: Team, index: number) => {
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
