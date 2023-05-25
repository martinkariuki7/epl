import { HandleTeamMatches, Team } from "../App";
import Table from "../components/Table/Table";
import TableKey from "../components/TableKey/TableKey";

interface Props {
  teams: Team[];
  handleTeamMatches: HandleTeamMatches;
  fixtures: any[];
}

const styles = {
  width: "min(100% - 2rem, 752px)",
  marginInline: "auto",
};

const Standings = ({ teams, handleTeamMatches, fixtures }: Props) => {
  return (
    <div style={styles}>
      <Table
        teams={teams}
        handleTeamMatches={handleTeamMatches}
        fixtures={fixtures}
      />
      <TableKey />
    </div>
  );
};

export default Standings;
