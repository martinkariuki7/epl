import { HandleTeamMatches, Team } from "../App";
import Table from "../components/Table/Table";

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
}

const Standings = ({ teams, handleTeamMatches }: Props) => {
  return (
    <div className="my-container">
      <Table teams={teams} handleTeamMatches={handleTeamMatches} />
    </div>
  );
};

export default Standings;
