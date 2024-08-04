"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./movieCard";
import style from "@/app/page.module.css";
import "swiper/css";
import { getMovieRanking } from "../api/getMovieRanking";

const MovieSwiper: React.FC = () => {
  const list = ["1", "2", "3", "4", "5", "6", "7"];

  return (
    <div className={style.swiper_wrapper}>
      <div className={style.swiper_title} onClick={getMovieRanking}>
        신작
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={5}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {list.map((i) => (
          <SwiperSlide>
            <MovieCard
              title={i}
              img="https://file.kinolights.com/m/content_poster/202405/21/12b1ef8d-a102-4826-8986-a85991c058b6.webp"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSwiper;
