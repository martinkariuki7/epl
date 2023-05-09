import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { Expand } from "@theme-toggles/react";

interface Props {
  teamColor: string;
  teamName: string;
}

const AppHeader = ({ teamColor, teamName }: Props) => {
  const [isToggled, setToggle] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [routeType, setRouteType] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setToggle(!isToggled);
    setTheme(theme === "light" ? "dark" : "light");
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/matches/")) {
      setRouteType("matches");
    } else {
      setRouteType("");
    }
  }, [location]);

  // Dark/Light mode effect
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <div className="app-header" style={{ backgroundColor: teamColor }}>
      {routeType === "matches" && (
        <button className="team-name" onClick={() => navigate(-1)}>
          ← {teamName}
        </button>
      )}

      <ul>
        <Link to="/matches">
          <li>Matches</li>
        </Link>
        <Link to="/news">
          <li>News</li>
        </Link>
        <Link to="/">
          <li>Standings</li>
        </Link>
        <Link to="/stats">
          <li>Stats</li>
        </Link>
        <Link to="/players">
          <li>Players</li>
        </Link>
      </ul>
      <div>
        <Expand
          duration={750}
          toggled={isToggled}
          toggle={toggleTheme}
          className="theme-toggle"
        />
      </div>
    </div>
  );
};

export default AppHeader;
