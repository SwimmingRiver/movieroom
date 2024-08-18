package twokang.movieroom;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class MovieroomApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieroomApplication.class, args);
	}
}


@RestController
@RequestMapping("/api")
class ApiController {
	@Value("${kobis.api.key}")
	private String apiKey;

	@Value("${kmdb.api.key}")
	private String kmdbApiKey;

	@Value("${kobis.api.daily.url}")
	private String dailyBoxOfficeUrl;

	@Value("${kobis.api.weekly.url}")
	private String weeklyBoxOfficeUrl;

	@Value("${kobis.api.movielist.url}")
	private String searchMovieListUrl;

	@Value("${kmdb.api.url}")
	private String searchKmdbMovieList;

	@GetMapping("/dailyBoxOffice")
	public ResponseEntity<String> getDailyBoxOffice(@RequestParam("targetDt") String targetDt) {
		String apiURL = dailyBoxOfficeUrl + "?key=" + apiKey + "&targetDt=" + targetDt;
		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("Content-Type", "application/json");

		String responseBody = get(apiURL, requestHeaders);
		String filteredResponse = filterMovieData(responseBody, true);
		System.out.println(filteredResponse);
		return ResponseEntity.ok(filteredResponse);
	}

	@GetMapping("/weeklyBoxOffice")
	public ResponseEntity<String> getWeeklyBoxOffice(@RequestParam("targetDt") String targetDt) {
		String apiURL = weeklyBoxOfficeUrl + "?key=" + apiKey + "&targetDt=" + targetDt + "&weekGb=0";
		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("Content-Type", "application/json");

		String responseBody = get(apiURL, requestHeaders);
		String filteredResponse = filterMovieData(responseBody, false);
		System.out.println(filteredResponse);
		return ResponseEntity.ok(filteredResponse);
	}

	@GetMapping("/searchMovieList")
	public ResponseEntity<String> getSearchMovieList(
			@RequestParam(required = false) String curPage,
			@RequestParam(required = false) String movieNm) throws UnsupportedEncodingException {

//		StringBuilder apiURL = new StringBuilder(searchMovieListUrl + "?key=" + apiKey);
		String apiURL = searchMovieListUrl + "?key=" + apiKey;
		if (curPage != null && !curPage.isEmpty()) {
			System.out.println(curPage);
			apiURL = apiURL + "&curPage=" + curPage;
		} else {
			System.out.println("nope");
			apiURL = apiURL + "&curPage=1";
		}

		if (movieNm != null && !movieNm.isEmpty()) {
			System.out.println(movieNm);
			apiURL = apiURL + "&movieNm=" + movieNm;
		}
		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("Content-Type", "application/json");

		String responseBody = get(apiURL, requestHeaders);
		String filteredResponse = filterSearchMovieData(responseBody);
		System.out.println(filteredResponse);
		return ResponseEntity.ok(filteredResponse);
	}

	@GetMapping("/searchKmdbMovieList")
	public ResponseEntity<String> searchKmdbMovieList(
			@RequestParam("movieNm") String movieNm) throws UnsupportedEncodingException {
		String encodedMovieNm = URLEncoder.encode(movieNm, "UTF-8");
		String apiURL = searchKmdbMovieList + "&detail=Y&title="
				+ encodedMovieNm +"&ServiceKey=" + kmdbApiKey;
		System.out.println(apiURL);
		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("Content-Type", "application/json");

		String responseBody = get(apiURL, requestHeaders);
		String filteredResponse = filterKmdbMovieDetails(responseBody);
		System.out.println(filteredResponse);
		return ResponseEntity.ok(filteredResponse);
	}
	@GetMapping("/searchDetail")
	public ResponseEntity<String> searchDetailKmdbMovieList(
			@RequestParam("movieSeq") String movieSeq) throws UnsupportedEncodingException {
		System.out.println(movieSeq);
		String encodedMovieSeq = URLEncoder.encode(movieSeq, "UTF-8");
		String apiURL = searchKmdbMovieList + "&detail=Y&movieSeq="
				+ encodedMovieSeq +"&ServiceKey=" + kmdbApiKey;
		System.out.println(apiURL);
		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("Content-Type", "application/json");

		String responseBody = get(apiURL, requestHeaders);
		String filteredResponse = filterKmdbMovieDetails(responseBody);
		System.out.println(filteredResponse);
		return ResponseEntity.ok(filteredResponse);
	}

	private String get(String apiUrl, Map<String, String> requestHeaders) {
		HttpURLConnection con = connect(apiUrl);
		try {
			con.setRequestMethod("GET");
			for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
				con.setRequestProperty(header.getKey(), header.getValue());
			}

			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				return readBody(con.getInputStream());
			} else {
				return readBody(con.getErrorStream());
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}

	private HttpURLConnection connect(String apiUrl) {
		try {
			URL url = new URL(apiUrl);
			return (HttpURLConnection) url.openConnection();
		} catch (MalformedURLException e) {
			throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
		} catch (IOException e) {
			throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
		}
	}

	private String readBody(InputStream body) {
		StringBuilder responseBody = new StringBuilder();
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(body, "UTF-8"))) {
			String line;
			while ((line = reader.readLine()) != null) {
				responseBody.append(line);
			}
		} catch (IOException e) {
			throw new RuntimeException("응답 본문 읽기 실패", e);
		}
		return responseBody.toString();
	}
	private String filterMovieData(String jsonResponse, boolean isDaily) {
		JSONObject jsonObject = new JSONObject(jsonResponse);
		JSONObject boxOfficeResult = jsonObject.getJSONObject("boxOfficeResult");
//		JSONArray dailyBoxOfficeList = boxOfficeResult.getJSONArray("dailyBoxOfficeList");
		JSONArray boxOfficeList;
		if (isDaily) {
			boxOfficeList = boxOfficeResult.getJSONArray("dailyBoxOfficeList");
		} else {
			boxOfficeList = boxOfficeResult.getJSONArray("weeklyBoxOfficeList");
		}


		StringBuilder filteredData = new StringBuilder();
		for (int i = 0; i < boxOfficeList.length(); i++) {
			JSONObject movie = boxOfficeList.getJSONObject(i);
			String movieNm = movie.getString("movieNm");
			String audiCnt = movie.getString("audiCnt");
			String rank = movie.getString("rank");

			filteredData.append("Movie Name: ").append(movieNm)
					.append(", Audience Count: ").append(audiCnt)
					.append(", Rank: ").append(rank).append("\n");
		}
		return filteredData.toString();
	}

	private String filterSearchMovieData(String jsonResponse) {
		JSONObject jsonObject = new JSONObject(jsonResponse);
		JSONArray movieListResult = jsonObject.getJSONObject("movieListResult").getJSONArray("movieList");

		StringBuilder filteredData = new StringBuilder();
		Integer totCnt = jsonObject.getJSONObject("movieListResult").getInt("totCnt");
		filteredData.append("Movie Count: ").append(totCnt).append("\n");
		for (int i = 0; i < movieListResult.length(); i++) {
			JSONObject movie = movieListResult.getJSONObject(i);
			String movieNm = movie.getString("movieNm");
			String openDt = movie.optString("openDt", "N/A"); // 개봉일이 없을 수도 있음

			filteredData.append("Movie Name: ").append(movieNm)
					.append(", Release Date: ").append(openDt).append("\n");
		}

		return filteredData.toString();
	}
	private String filterKmdbMovieDetails(String jsonResponse) {
		JSONObject jsonObject = new JSONObject(jsonResponse);

		int totalCount = jsonObject.getInt("TotalCount");

		JSONArray dataArray = jsonObject.getJSONArray("Data");
		JSONObject firstDataObject = dataArray.getJSONObject(0);

		JSONArray resultArray = firstDataObject.getJSONArray("Result");

		StringBuilder filteredData = new StringBuilder();
		filteredData.append("Total Count: ").append(totalCount).append("\n");

		for (int i = 0; i < resultArray.length(); i++) {
			JSONObject movie = resultArray.getJSONObject(i);

			String title = movie.getString("title");
			String prodYear = movie.getString("prodYear");
			String movieSeq = movie.getString("movieSeq");
			String runtime = movie.getString("runtime");
			String keywords = movie.getString("keywords");
			String posters = movie.optString("posters", "N/A");

			JSONArray plots = movie.getJSONObject("plots").getJSONArray("plot");
			String plotText = "";
			for (int j = 0; j < plots.length(); j++) {
				JSONObject plot = plots.getJSONObject(j);
				if ("한국어".equals(plot.getString("plotLang"))) {
					plotText = plot.getString("plotText");
					break;
				}
			}

			filteredData.append("Title: ").append(title).append("\n")
					.append("MovieSeq: ").append(movieSeq).append("\n")
					.append("Production Year: ").append(prodYear).append("\n")
					.append("Runtime: ").append(runtime).append("\n")
					.append("Keywords: ").append(keywords).append("\n")
					.append("Poster: ").append(posters).append("\n")
					.append("Plot: ").append(plotText).append("\n")
					.append("-------------------------------\n");
		}

		return filteredData.toString();
	}
}