import React from "react";
import styles from "@/app/page.module.css";
const MovieCard = ({ title, img }: { title: string; img: string }) => {
  return (
    <div className={styles.movie_card}>
      <img className={styles.movie_card_image} src={img} />
      <div className={styles.movie_card_info}>{title}</div>
    </div>
  );
};

export default MovieCard;
