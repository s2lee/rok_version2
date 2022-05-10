import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("user") ? localStorage.getItem("user") : null
  );
  let [loading, setLoading] = useState(true);

  const history = useHistory();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("https://therok.net/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(data.user);
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("아이디 또는 비밀번호가 잘못되어 로그인할 수 없습니다.");
    }
  };

  let logoutUser = async (e) => {
    e.preventDefault();
    let response = await fetch("https://therok.net/accounts/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens.refresh_token }),
    });

    if (response.status === 200) {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(authTokens.user);
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
