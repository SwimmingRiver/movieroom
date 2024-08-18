import React from "react";
import style from "@/app/page.module.css";
const SearchResult = ({ searchData }: { searchData: string }) => {
  return (
    <div className={style.search_result_card}>
      <div className={style.search_result_poster}>
        <img
          className={style.search_image}
          src="https://file.kinolights.com/m/content_poster/202405/21/12b1ef8d-a102-4826-8986-a85991c058b6.webp"
          alt="search post"
        />
      </div>
      <div className={style.search_result_content}>
        <div>{searchData}</div>
        <div>장르</div>
        <div>연도</div>
      </div>
    </div>
  );
};

export default SearchResult;
