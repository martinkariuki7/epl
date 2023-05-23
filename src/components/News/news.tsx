import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "../../utils/FormatDate";
import styles from "./news.module.css";

interface News {
  id: number;
  title: {
    rendered: string;
  };
  fimg_url: string;
  modified: string;
}

const News = () => {
  const API_NEWS_URL = import.meta.env.VITE_APP_API_NEWS_URL;
  const [news, setNews] = useState<News[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<News[]>(API_NEWS_URL)
      .then((res) => setNews(res.data))
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        setNews([]);
      });
  }, []);

  if (error)
    return <p className="text-danger mt-3 mb-3 text-center">{error}</p>;

  return (
    <ul className={styles.newsWrapper}>
      {isLoading && <li className="text-center mt-5">Loading..</li>}
      {news.map((news) => (
        <li className={styles.singleNewsWrapper} key={news.id}>
          <div>
            <h2>{news.title.rendered}</h2>
            <div>{formatDate(news.modified)}</div>
          </div>
          <img src={news.fimg_url} alt={news.title.rendered} />
        </li>
      ))}
    </ul>
  );
};

export default News;
