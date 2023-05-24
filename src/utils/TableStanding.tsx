import winIcon from "../assets/win.svg";
import drawIcon from "../assets/draw.svg";
import lostIcon from "../assets/lost.svg";
import { Match } from "../pages/Matches";

// Calculate how many matches a team has played
const getMatchesPlayed = (id: number, array: Match[]) => {
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
const getTeamPoints = (id: number, array: Match[]) => {
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
const getMatchesWon = (id: number, array: Match[]) => {
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
const getMatchesLost = (id: number, array: Match[]) => {
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
const getMatchesDrawn = (id: number, array: Match[]) => {
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
const getTeamGoalsFor = (id: number, array: Match[]) => {
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
const getTeamGoalsAgainst = (id: number, array: Match[]) => {
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
const checkLastFiveGames = (id: number, array: Match[]) => {
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

        if (lastFiveGames.length === 5) return lastFiveGames;
      }
    }
  }

  return lastFiveGames;
};

export {
  getMatchesPlayed,
  getTeamPoints,
  getMatchesWon,
  getMatchesLost,
  getMatchesDrawn,
  getTeamGoalsFor,
  getTeamGoalsAgainst,
  checkLastFiveGames,
};
