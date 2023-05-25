import winIcon from "../../assets/win.svg";
import drawIcon from "../../assets/draw.svg";
import lostIcon from "../../assets/lost.svg";
import styles from "./TableKey.module.css";

const TableKey = () => {
  return (
    <div className={styles.tableKeyWrapper}>
      <div className={styles.leaguesWrapper}>
        <h5>Qualification/Relegation</h5>
        <ul>
          <li>
            <div className={[styles.cl, styles.leagueMarker].join(" ")}></div>
            <div>UEFA Champions League group stage</div>
          </li>
          <li>
            <div
              className={[styles.europa, styles.leagueMarker].join(" ")}
            ></div>
            <div>Europa League group stage</div>
          </li>
          <li>
            <div
              className={[styles.europaConference, styles.leagueMarker].join(
                " "
              )}
            ></div>
            <div>Europa Conference League qualifiers</div>
          </li>
          <li>
            <div
              className={[styles.relegation, styles.leagueMarker].join(" ")}
            ></div>
            <div>Relegation</div>
          </li>
        </ul>
      </div>
      <div className={styles.lastFiveMatches}>
        <h5>Last 5 matches</h5>
        <ul>
          <li>
            <img src={winIcon} alt="Win icon" />
            <div>Win</div>
          </li>
          <li>
            <img src={drawIcon} alt="Draw icon" />
            <div>Draw</div>
          </li>
          <li>
            <img src={lostIcon} alt="Lost icon" />
            <div>Loss</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableKey;
