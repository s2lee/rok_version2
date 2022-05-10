import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  let history = useHistory();
  const initialUserState = {
    username: "",
    password1: "",
    password2: "",
    nickname: "",
  };

  const [user, setUser] = useState(initialUserState);
  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const SignUp = async (e) => {
    e.preventDefault();
    axios
      .post(`https://therok.net/accounts/signup/`, user)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        for (var key in error.response.data) {
          alert(error.response.data[key]);
        }
      });
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <div className="login-main-container">
        <form onSubmit={SignUp} className="form-container">
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleSignUpChange}
              className="input"
              required
            />
            <label className="input-label">아이디</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password1"
              value={user.password1}
              onChange={handleSignUpChange}
              className="input"
              required
            />
            <label className="input-label">비밀번호</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password2"
              value={user.password2}
              onChange={handleSignUpChange}
              className="input"
              required
            />
            <label className="input-label">비밀번호 확인</label>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="nickname"
              value={user.nickname}
              onChange={handleSignUpChange}
              className="input"
              required
            />
            <label className="input-label">닉네임</label>
          </div>
          <div className="button-box">
            <button type="submit" className="btn btn-primary">
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
