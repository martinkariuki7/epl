import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <div className="app-header">
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
    </div>
  );
};

export default AppHeader;
