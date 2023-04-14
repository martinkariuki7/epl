import Table from "../components/Table";

export interface StandingsInterface {}
//@ts-ignore
const Standings = ({ teams, setTeams, handleTeamMatches }) => {
  return (
    <div className="my-container">
      <Table
        teams={teams}
        setTeams={setTeams}
        handleTeamMatches={handleTeamMatches}
      />
    </div>
  );
};

export default Standings;
