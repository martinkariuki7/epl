import styles from "./player.module.css";

export interface PlayersInterface {
  title: {
    rendered: string;
  };
  id: number;
  fimg_url: string;
  acf: {
    position: string;
  };
}

export interface PlayersInterfaceArray extends Array<PlayersInterface> {}

interface Props {
  player: PlayersInterface;
}

const Player = ({ player }: Props): JSX.Element => {
  const {
    fimg_url,
    title: { rendered },
    acf: { position },
  } = player;
  return (
    <div className={styles.singlePlayer}>
      <img src={fimg_url} alt={rendered} />
      <div className={styles.singlePlayerDescription}>
        <p>{rendered}</p>
        <span>{position}</span>
      </div>
    </div>
  );
};

export default Player;
