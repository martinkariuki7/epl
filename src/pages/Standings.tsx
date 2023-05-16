import { HandleTeamMatches, Team } from "../App";
import Table from "../components/Table/Table";

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
}

const styles = {
  width: "min(100% - 2rem, 752px)",
  marginInline: "auto",
};

const Standings = ({ teams, handleTeamMatches }: Props) => {
  return (
    <div style={styles}>
      <Table teams={teams} handleTeamMatches={handleTeamMatches} />
    </div>
  );
};

export default Standings;
