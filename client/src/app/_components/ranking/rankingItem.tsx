import React from "react";
import style from "@/app/page.module.css";
import { IRankingItemProps } from "@/app/types/movieRank";

const RankingItem: React.FC<IRankingItemProps> = ({
  rank,
  rankInten,
  movieNm,
}) => {
  return (
    <div className={style.ranking_item}>
      <div>
        <div>{rank}</div>
        {+rankInten > 0 ? (
          <div style={{ color: "green" }}>{rankInten}</div>
        ) : +rankInten === 0 ? (
          <div>{rankInten}</div>
        ) : (
          <div style={{ color: "red" }}>{rankInten}</div>
        )}
      </div>

      <div className={style.ranking_img_wrapper}>
        <img
          className={style.ranking_img}
          src="https://file.kinolights.com/m/content_poster/202405/21/12b1ef8d-a102-4826-8986-a85991c058b6.webp"
        />
      </div>

      <p>{movieNm}</p>
    </div>
  );
};

export default RankingItem;
