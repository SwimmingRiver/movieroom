"use client";
import React, { FormEvent, useState } from "react";
import style from "@/app/page.module.css";
import SearchResult from "./components/searchResult";
const page = () => {
  const [inputData, setInputData] = useState("");
  const [searchData, setSearchData] = useState("");
  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchData(inputData);
    setInputData("");
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
      {searchData ? <SearchResult searchData={searchData} /> : null}
    </div>
  );
};

export default page;
