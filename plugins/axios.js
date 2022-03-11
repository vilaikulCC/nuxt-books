export default function ({ $axios, error: nuxtError }) {
  $axios.onRequest(config => {
    config.headers.common['x-rapidapi-host'] = "books17.p.rapidapi.com"
    config.headers.common['x-rapidapi-key'] = "1e5c02e3f1mshe8629fad46ed3b0p1c0fdajsn828d38e352f4"
  })
  // $axios.setHeader("x-rapidapi-host", "books17.p.rapidapi.com");
  // $axios.setHeader(
  //   "x-rapidapi-key",
  //   "1e5c02e3f1mshe8629fad46ed3b0p1c0fdajsn828d38e352f4"
  // );
  $axios.setBaseURL("https://books17.p.rapidapi.com/");
  $axios.onError((error) => {
    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    });
    return Promise.resolve(false);
  });
}
