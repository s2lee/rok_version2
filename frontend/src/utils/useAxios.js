import { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";

const baseURL = "https://therok.net";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access_token}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access_token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/accounts/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access_token));

    req.headers.Authorization = `Bearer ${response.data.access_token}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
