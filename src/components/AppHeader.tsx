import { Link } from "react-router-dom";

interface Props {
  teamColor: string;
}

const AppHeader = ({ teamColor }: Props) => {
  return (
    <div className="app-header" style={{ backgroundColor: teamColor }}>
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
