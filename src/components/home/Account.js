import React, { useState } from "react";
import "../../styles/css/main.css";
import cap_main2 from "../../styles/images/cap_main2.JPG";
import instagram_logo from "../../styles/images/instagram_logo.svg";

const Index = () => {
  const [email, setEmail] = useState(0);
  const [name, setName] = useState(0);
  const [id, setId] = useState(0);
  const [password, setPassword] = useState(0);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value.length);
  };
  const handleChangeName = (e) => {
    setName(e.target.value.length);
  };
  const handleChangeId = (e) => {
    setId(e.target.value.length);
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
            <form>
              <input
                onChange={handleChangeEmail}
                type="text"
                placeholder="이메일 주소"
              />
              <input
                onChange={handleChangeName}
                type="text"
                placeholder="성명"
              />
              <input
                onChange={handleChangeId}
                type="text"
                placeholder="사용자 이름"
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
              className={
                email > 0 && name > 0 && id > 0 && password > 0 ? "on" : "off"
              }
              onClick={
                email > 0 && name > 0 && id > 0 && password > 0
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
