"use client";
import React, { useState } from "react";
import style from "@/app/page.module.css";
const Page = () => {
  const [tab, setTab] = useState("줄거리");
  return (
    <div className={style.movie_info_wrapper}>
      <div className={style.movie_info_content}>
        <div className={style.movie_info_title}>
          <div>title</div>
          <div>rate</div>
          <div>기타 정보</div>
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
    </div>
  );
};

export default Page;
