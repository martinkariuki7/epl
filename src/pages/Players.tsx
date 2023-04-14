export interface PlayersInterface {
  players: [
    {
      title: {
        rendered: string;
      };
      id: number;
      fimg_url: string;
      acf: {
        position: string;
      };
    }
  ];
}

const Players = ({ players }: PlayersInterface) => {
  return (
    <div className="my-container players-wrapper">
      {players.map((player) => (
        <div className="single-player" key={player.id}>
          <img src={player.fimg_url} alt={player.title.rendered} />
          <div className="single-player-description">
            <p> {player.title.rendered}</p>
            <span>{player.acf.position}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Players;
