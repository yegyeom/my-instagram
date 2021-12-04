import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../../styles/css/main.css";
import cap_main1 from "../../styles/images/cap_main1.JPG";
import instagram_logo from "../../styles/images/instagram_logo.svg";

const Index = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleComplete = () => {
    console.log("로그인 버튼 클릭");
    axios
      .post("/api/auth/login", {
        userId,
        password,
      })
      .then((res) => {
        const { code } = res.data;

        if (code === 400) {
          // setOverlap(true);
        } else if (code === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-layout">
      <div className="main-img">
        <img src={cap_main1} alt="main-img" />
      </div>
      <div className="main-form">
        <div className="sign-in">
          <div className="intro">
            <img className="logo-img" src={instagram_logo} alt="logo-img" />
            <div>친구들의 사진과 동영상을 보려면 로그인하세요.</div>
          </div>
          <div>
            <form>
              <input
                onChange={handleUserIdChange}
                id="userId"
                type="text"
                name="userId"
                placeholder="ID (사용자 이름)"
              />
              <input
                onChange={handlePasswordChange}
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호"
              />
              <br />
            </form>
            <button
              id="login"
              type="submit"
              className={
                userId.length > 0 && password.length > 0 ? "on" : "off"
              }
              onClick={
                userId.length > 0 && password.length > 0 ? handleComplete : null
              }
            >
              로그인
            </button>
          </div>
        </div>
        <div className="join">
          <span>계정이 없으신가요? &nbsp;</span>
          <NavLink to={"/account"} className="join-link">
            회원가입
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Index;
