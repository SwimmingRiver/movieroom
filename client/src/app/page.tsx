import MovieCard from "./_components/movieCard";
import RankingList from "./_components/ranking/rankingList";
import MovieSwiper from "./_components/swiper";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <RankingList />
      <MovieSwiper />
      <MovieSwiper />
    </main>
  );
}
