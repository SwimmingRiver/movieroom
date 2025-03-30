"use client";
import React, { useState } from "react";
import style from "@/app/page.module.css";
import Chart from "@/app/_components/chart";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getMovieInfo from "@/app/api/getMovieInfo";

const Page = () => {
  const { movieId } = useParams();
  const [showAllActors, setShowAllActors] = useState(false);
  const [tab, setTab] = useState("줄거리");

  const { data } = useQuery({
    queryKey: ["movieInfo", movieId],
    queryFn: () => getMovieInfo(movieId as string),
  });

  interface PeopleInfo {
    peopleNm: string;
    peopleNmEn: string;
  }

  const displayedActors = showAllActors 
    ? data?.movieInfoResult.movieInfo.actors 
    : data?.movieInfoResult.movieInfo.actors.slice(0, 2);

  return (
    <div className={style.movie_info_wrapper}>
      <div className={style.movie_info_content}>
        <div className={style.movie_info_title}>
          <div style={{display:"flex",  gap:"4px"}}>
            {data?.movieInfoResult.movieInfo.movieNm}
            ({data?.movieInfoResult.movieInfo.prdtYear})
          </div>
          <div style={{display:"flex",  gap:"4px"}}>
            <span>개봉일</span>
            {data?.movieInfoResult.movieInfo.openDt}
          </div>
          <div style={{display:"flex",  gap:"4px"}}>
            <span>연출</span>
            {data?.movieInfoResult.movieInfo.directors.map((director:PeopleInfo) => (
              <div key={director.peopleNm}>{director.peopleNm}</div>
            ))}
          </div>
          <div style={{display:"flex",  gap:"4px"}}>
            <span>출연</span>
            {displayedActors?.map((actor:PeopleInfo) => (
              <div key={actor.peopleNm} style={{display:"inline-block"}}>{actor.peopleNm}</div>
            ))}
            {data?.movieInfoResult.movieInfo.actors.length > 2 && (
              <button 
                onClick={() => setShowAllActors(!showAllActors)}
                className={style.more_button}
              >
                {showAllActors ? '접기' : '더보기'}
              </button>
            )}
          </div>
        </div>
        <img
          src="https://file.kinolights.com/m/content_poster/202405/21/12b1ef8d-a102-4826-8986-a85991c058b6.webp"
          className={style.movie_info_image}
          alt="movieposter"
        />
      </div>
      <div className={style.movie_info_tab_wrapper}>
        <div
          className={style.movie_info_button}
          onClick={() => {
            setTab("줄거리");
          }}
        >
          <span
            className={
              tab === "줄거리" ? style.selected_tab : style.unselected_tab
            }
          >
            줄거리
          </span>
        </div>
        <div
          className={style.movie_info_button}
          onClick={() => {
            setTab("리뷰");
          }}
        >
          <span
            className={
              tab === "리뷰" ? style.selected_tab : style.unselected_tab
            }
          >
            리뷰
          </span>
        </div>
        <div
          className={style.movie_info_button}
          onClick={() => {
            setTab("차트");
          }}
        >
          <span
            className={
              tab === "차트" ? style.selected_tab : style.unselected_tab
            }
          >
            차트
          </span>
          
        </div>
      </div>
      <div className={style.movie_info_chart_wrapper}>
        {tab === "차트" && <Chart />}
      </div>
    </div>
  );
};

export default Page;
