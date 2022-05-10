import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div className="login-main-container">
        <form onSubmit={loginUser} className="form-container">
          <div className="input-box">
            <input
              type="text"
              name="username"
              className="input"
              required="required"
            />
            <label className="input-label">아이디</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              className="input"
              required="required"
            />
            <label className="input-label">비밀번호</label>
          </div>
          <div className="button-box">
            <button type="submit" className="btn btn-primary">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
