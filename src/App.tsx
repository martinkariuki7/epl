import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { formatDate } from "./utils/FormatDate";
import { formatTime } from "./utils/FormatTime";

import AppHeader from "./components/AppHeader";
import Standings from "./pages/Standings";
import NotFound from "./pages/NotFound";
import Matches from "./pages/Matches";
import NewsPage from "./pages/News";
import Stats from "./pages/Stats";
import Players from "./pages/Players";
import SingleTeamMatches from "./pages/SingleTeamMatches";

import { Expand } from "@theme-toggles/react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@theme-toggles/react/css/Expand.css";
import "./App.css";

interface Team {
  id?: number;
  title?: {
    rendered: string;
  };
  fimg_url?: string;
}

const App = () => {
  const API_TEAMS_URL = import.meta.env.VITE_APP_API_TEAMS_URL;
  const API_FIXTURES_URL = import.meta.env.VITE_APP_API_FIXTURES_URL;
  const API_PLAYERS_URL = import.meta.env.VITE_APP_API_PLAYERS_URL;

  const [isToggled, setToggle] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [isLoading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teamId, setTeamId] = useState(0);
  const navigate = useNavigate(); // Hook into the navigate

  const toggleTheme = () => {
    setToggle(!isToggled);
    setTheme(theme === "light" ? "dark" : "light");
  };

  //
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const teamsResponse = await axios.get(API_TEAMS_URL);
      setTeams(teamsResponse.data);
      const matchesResponse = await axios.get(API_FIXTURES_URL);
      setMatches(matchesResponse.data);
      const playersResponse = await axios.get(API_PLAYERS_URL);
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

  // Dark/Light mode effect
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  // Fetch teams data effect
  useEffect(() => {
    fetchData();
  }, []);

  // Handle programmatic navigation to a single team's matches
  const handleTeamMatches = (id: number) => {
    const url = "/matches/" + id;
    setTeamId(id);
    navigate(url); // Call navigate function with the desired URL
  };

  // Handle Match results
  // Display match results
  const handleMatchResults = (
    ispostponed: Boolean,
    homeTeamGoals: string,
    matchDate: string,
    matchTime: string
  ) => {
    if (ispostponed) {
      return (
        <>
          <span style={{ color: "yellow" }}>Postponed</span>
          <span>Time TBD</span>
        </>
      );
    } else if (homeTeamGoals !== "") {
      return (
        <>
          <span>FT</span>
          <span>{formatDate(matchDate)}</span>
          <img
            src="../match-highlights.png"
            alt="Match highlights"
            className="mt-1"
          />
        </>
      );
    } else {
      return (
        <div>
          <span>{formatDate(matchDate)}</span>
          <span>{formatTime(matchTime)}</span>
        </div>
      );
    }
  };

  // Format Team Name from Team ID
  const handleTeamName = (id: number): JSX.Element | string => {
    //@ts-ignore
    const team = teams.find((team) => team.id === id);
    if (team) {
      return (
        <>
          <img
            className="matches-logo"
            //@ts-ignore
            src={team.fimg_url}
            //@ts-ignore
            alt={team?.title?.rendered}
          />

          {
            //@ts-ignore
            team.title.rendered
          }
        </>
      );
    }
    return "";
  };

  return (
    <div className="app-wrapper">
      <AppHeader />
      {error && <p className="text-danger mt-3 mb-3 text-center">{error}</p>}
      {isLoading && (
        <div className="preloader">
          <div className="spinner-border"></div>
        </div>
      )}
      <Routes>
        <Route
          index
          element={
            <Standings
              teams={teams}
              setTeams={setTeams}
              handleTeamMatches={handleTeamMatches}
            />
          }
        />
        <Route
          path="/matches"
          element={
            //@ts-ignore
            <Matches
              teams={teams}
              matches={matches}
              setMatches={setMatches}
              //@ts-ignore
              handleTeamName={handleTeamName}
              //@ts-ignore
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
              //@ts-ignore
              handleTeamName={handleTeamName}
              //@ts-ignore
              handleMatchResults={handleMatchResults}
            />
          }
        />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/stats" element={<Stats />} />
        <Route
          path="/players"
          element={
            <Players
              //@ts-ignore
              players={players}
            />
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Expand
        duration={750}
        toggled={isToggled}
        toggle={toggleTheme}
        className="theme-toggle"
      />
    </div>
  );
};

export default App;
