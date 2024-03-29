import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { formatDate } from "./utils/FormatDate";
import { formatTime } from "./utils/FormatTime";

import AppHeader from "./components/AppHeader/AppHeader";
import Standings from "./pages/Standings";
import NotFound from "./pages/NotFound";
import Matches from "./pages/Matches";
import NewsPage from "./pages/News";
import Players from "./pages/Players";
import SingleTeamMatches from "./pages/SingleTeamMatches";
import MatchHighlightsIcon from "./assets/match-highlights.png";

import {
  PlayersInterface,
  PlayersInterfaceArray,
} from "./components/Player/player";
import { HandleMatchResults, Match } from "./pages/Matches";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface FetchTeamsResponse extends Array<Team> {}
interface FetchMatchesResponse extends Array<Match> {}

export interface Team {
  id: number;
  title: {
    rendered: string;
  };
  fimg_url: string;
  acf: {
    team_color: string;
  };
}

export interface HandleTeamMatches {
  (id: number, color: string, teamName: string): void;
}

const App = () => {
  const API_TEAMS_URL = import.meta.env.VITE_APP_API_TEAMS_URL;
  const API_FIXTURES_URL = import.meta.env.VITE_APP_API_FIXTURES_URL;
  const API_PLAYERS_URL = import.meta.env.VITE_APP_API_PLAYERS_URL;

  const defaultHeaderColor = "#341449";
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState("");
  const [players, setPlayers] = useState<PlayersInterface[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [teamId, setTeamId] = useState(0);
  const [teamColor, setTeamColor] = useState(defaultHeaderColor);
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate(); // Hook into the navigate

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const teamsResponse = await axios.get<FetchTeamsResponse>(API_TEAMS_URL);
      setTeams(teamsResponse.data);
      const matchesResponse = await axios.get<FetchMatchesResponse>(
        API_FIXTURES_URL
      );
      setMatches(matchesResponse.data);
      const playersResponse = await axios.get<PlayersInterfaceArray>(
        API_PLAYERS_URL
      );
      setPlayers(playersResponse.data);
      setLoading(false);
    } catch (err) {
      setError((err as AxiosError).message);
      setTeams([]);
      setMatches([]);
      setPlayers([]);
      setLoading(false);
    }
  }, []);

  // Fetch app data
  useEffect(() => {
    fetchData();
  }, []);

  /* Reset header color
  BANDAID solution, to be refactored.
  */
  useEffect(() => {
    if (!location.pathname.includes("matches/"))
      setTeamColor(defaultHeaderColor);
  }, [location]);

  // Handle programmatic navigation to a single team's matches
  const handleTeamMatches = (id: number, color: string, teamName: string) => {
    const url = "/matches/" + id;
    setTeamId(id);
    setTeamColor(color);
    setTeamName(teamName);
    navigate(url);
  };

  // Handle Match results
  const handleMatchResults: HandleMatchResults = (
    ispostponed,
    home_team_goals,
    match_date,
    match_time
  ): JSX.Element => {
    if (ispostponed) {
      return (
        <>
          <span style={{ color: "#FFCC00" }}>Postponed</span>
          <span>Time TBD</span>
        </>
      );
    } else if (home_team_goals !== "") {
      return (
        <>
          <span>FT</span>
          <span>{formatDate(match_date)}</span>
          <img
            src={MatchHighlightsIcon}
            alt="Match highlights"
            className="mt-1"
          />
        </>
      );
    } else {
      return (
        <div>
          <span>{formatDate(match_date)}</span>
          <span>{formatTime(match_time)}</span>
        </div>
      );
    }
  };

  // Format Team Name from Team ID
  const handleTeamName = (id: number): JSX.Element | string => {
    const team: Team | undefined = teams.find((team) => team?.id === id);
    if (team !== undefined) {
      return (
        <>
          <img
            style={{ width: "21px", height: "auto", marginRight: "10px" }}
            src={team.fimg_url}
            alt={team?.title?.rendered}
          />

          {team.title.rendered}
        </>
      );
    }
    return "";
  };

  return (
    <>
      {isLoading && (
        <div className="preloader">
          <div className="spinner-border"></div>
        </div>
      )}
      <AppHeader
        teamColor={teamColor ? teamColor : defaultHeaderColor}
        teamName={teamName}
      />
      {error && <p className="text-danger mt-3 mb-3 text-center">{error}</p>}
      <Routes>
        <Route
          index
          element={
            <Standings
              teams={teams}
              handleTeamMatches={handleTeamMatches}
              fixtures={matches}
            />
          }
        />
        <Route
          path="/matches"
          element={
            <Matches
              matches={matches}
              handleTeamName={handleTeamName}
              handleMatchResults={handleMatchResults}
            />
          }
        />
        <Route
          path="/matches/:id"
          element={
            <SingleTeamMatches
              teamId={teamId}
              matches={matches}
              setMatches={setMatches}
              handleTeamName={handleTeamName}
              handleMatchResults={handleMatchResults}
            />
          }
        />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/players" element={<Players players={players} />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
