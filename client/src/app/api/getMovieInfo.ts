import axios from "axios";


const getMovieInfo = async (movieId: string) => {
  console.log(movieId);
  try {
    const res = await axios.get(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${process.env.NEXT_PUBLIC_KOBIS_KEY}&movieCd=${movieId}`
    );
    return res.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export default getMovieInfo;
