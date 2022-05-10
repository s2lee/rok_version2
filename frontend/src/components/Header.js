import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="header">
      <h1>
        <Link to="/">The Rank of Korea </Link>
      </h1>
      <div className="auth-container">
        {user ? (
          <>
            <span id="nickname">{user.username} | </span>
            <span id="logout" onClick={logoutUser}>
              로그아웃
            </span>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <span> | </span>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
