import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "https://therok.net";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access_token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.access_token}`;
  }

  const user = jwt_decode(authTokens.access_token);
  console.timeLog(user);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  console.log("isEx:", isExpired);
  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/accounts/token/refresh/`, {
    refresh: authTokens.refresh_token,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
