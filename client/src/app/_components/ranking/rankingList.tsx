"use client";
import React from "react";
import style from "@/app/page.module.css";
import RankingItem from "./rankingItem";
import { getMovieRanking } from "@/app/api/getMovieRanking";
import { useQuery } from "@tanstack/react-query";
import { IRankingItem } from "@/app/types/movieRank";
import Link from "next/link";
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
          <Link href={`movie_info/${i.movieCd}`}>
            <RankingItem
              key={i.movieCd}
              rank={i.rank}
              rankInten={i.rankInten}
              movieNm={i.movieNm}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RankingList;
