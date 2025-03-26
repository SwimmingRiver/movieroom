"use client";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import style from "@/app/page.module.css";
import SearchResult from "./components/searchResult";
import { useQuery } from "@tanstack/react-query";
import { getMoviveSearch } from "../api/getMovieSearch";
import { ISearchResultProps } from "../types/movieSearch";
const page = () => {
  const [inputData, setInputData] = useState("");
  const [searchData, setSearchData] = useState("");
  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const {
    data: movieSearchList,
    refetch,
    isRefetching,
    isSuccess,
  } = useQuery({
    queryKey: ["movieSearch", searchData],
    queryFn: () => {
      getMoviveSearch({ movieNm: searchData });
    },

    enabled: false,
  });
  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchData(inputData);

    console.log({ movieSearchList });
    await refetch();
    if (isSuccess) {
      console.log({ movieSearchList });
      setInputData("");
      setSearchData("");
    }
    if (isRefetching) {
      console.log("refetching!!");
    }
  };

  return (
    <div className={style.search_wrapper}>
      <div className={style.search_box}>
        <form className={style.search_form} onSubmit={handelSubmit}>
          <input
            className={style.search_input}
            onChange={handleInputData}
            value={inputData}
          />
          {inputData ? (
            <button
              type="button"
              onClick={() => {
                setInputData("");
              }}
            >
              x
            </button>
          ) : null}
        </form>
      </div>
      {/* {movieSearchList
        ? movieSearchList.map((item: ISearchResultProps) => (
            <SearchResult searchData={item.Title} />
          ))
        : null} */}
      {movieSearchList ? <div>{movieSearchList}</div> : null}
    </div>
  );
};

export default page;
