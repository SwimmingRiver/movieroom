"use client";
import React, { useEffect, useState } from "react";
import style from "@/app/page.module.css";
import RankingItem from "./rankingItem";
import { getMovieRanking } from "@/app/api/getMovieRanking";
import { useQuery } from "@tanstack/react-query";
import { IRankingItem } from "@/app/types/movieRank";

const RankingList = () => {
  const { data: movieRankList } = useQuery({
    queryKey: ["movieRank"],
    queryFn: getMovieRanking,
    initialData: [],
  });

  return (
    <div className={style.ranking_wrapper}>
      <div>Ranking</div>
      <div className={style.ranking_list}>
        {movieRankList?.map((i: IRankingItem) => (
          <RankingItem
            key={i.movieCd}
            rank={i.rank}
            rankInten={i.rankInten}
            movieNm={i.movieNm}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingList;
