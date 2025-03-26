import { axiosInstance } from "./axiosInstance";

export const getMoviveSearch = async ({ movieNm }: { movieNm: string }) => {
  try {
    if (!movieNm) {
      return [];
    }
    const res = await axiosInstance.get(
      `api/searchKmdbMovieList?movieNm=${movieNm}`
    );

    const data = res.data;
    console.log({ movieNm });
    console.log({ data });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
