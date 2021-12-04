import React, { useState } from "react";
import "../../styles/css/main.css";
import cap_main2 from "../../styles/images/cap_main2.JPG";
import instagram_logo from "../../styles/images/instagram_logo.svg";

const Index = () => {
  const [email, setEmail] = useState(0);
  const [name, setName] = useState(0);
  const [nick, setNick] = useState(0);
  const [password, setPassword] = useState(0);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value.length);
  };
  const handleChangeName = (e) => {
    setName(e.target.value.length);
  };
  const handleChangeNick = (e) => {
    setNick(e.target.value.length);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value.length);
  };

  const handleClick = () => {
    console.log("가입 버튼 클릭");
  };

  return (
    <div className="main-layout">
      <div className="main-img">
        <img src={cap_main2} alt="main-img" />
      </div>
      <div className="main-form">
        <div className="sign-in">
          <div className="intro">
            <img className="logo-img" src={instagram_logo} alt="logo-img" />
            <div>친구들의 사진과 동영상을 보려면 가입하세요.</div>
          </div>
          <div>
            <form id="join-form" action="/auth/join" method="post">
              <input
                onChange={handleChangeEmail}
                id="join-email"
                type="email"
                name="email"
                placeholder="이메일 주소"
              />
              <input
                onChange={handleChangeName}
                id="join-name"
                type="text"
                name="name"
                placeholder="성명"
              />
              <input
                onChange={handleChangeNick}
                id="join-nick"
                type="text"
                name="nick"
                placeholder="사용자 이름"
              />
              <input
                onChange={handleChangePassword}
                id="join-password"
                type="password"
                name="password"
                placeholder="비밀번호"
              />
              <br />
            </form>
            <button
              type="submit"
              className={
                email > 0 && name > 0 && nick > 0 && password > 0 ? "on" : "off"
              }
              onClick={
                email > 0 && name > 0 && nick > 0 && password > 0
                  ? handleClick
                  : null
              }
            >
              가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
