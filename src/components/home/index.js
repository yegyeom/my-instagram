import React, { useState } from "react";
import "../../styles/css/main.css";
import cap_main1 from "../../styles/images/cap_main1.JPG";
import instagram_logo from "../../styles/images/instagram_logo.svg";

const Index = () => {
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value.length);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value.length);
  };

  const handleClick = () => {
    console.log("로그인 버튼 클릭");
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
                onChange={handleChangeEmail}
                type="text"
                placeholder="이메일 주소"
              />
              <input
                onChange={handleChangePassword}
                type="password"
                placeholder="비밀번호"
              />
              <br />
            </form>
            <button
              type="button"
              className={email > 0 && password > 0 ? "on" : "off"}
              onClick={email > 0 && password > 0 ? handleClick : null}
            >
              로그인
            </button>
          </div>
        </div>
        <div className="join">
          <span>계정이 없으신가요? &nbsp;</span>
          <a href={"/account"} className="join-link">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
