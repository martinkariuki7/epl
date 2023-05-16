import Player from "../components/Player/player";
import { PlayersInterface } from "../components/Player/player";

interface Props {
  players: PlayersInterface[];
}

const styles = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "1em",
  marginBottom: "3em",
  width: "min(100% - 2rem, 752px)",
  marginInline: "auto",
};

const Players = ({ players }: Props) => {
  return (
    <div style={styles}>
      {players.map((player) => (
        <Player key={player.id} player={player} />
      ))}
    </div>
  );
};

export default Players;
