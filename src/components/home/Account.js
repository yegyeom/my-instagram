import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../../styles/css/main.css";
import cap_main2 from "../../styles/images/cap_main2.JPG";
import instagram_logo from "../../styles/images/instagram_logo.svg";

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [duplicateInput, setDuplicateInput] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleComplete = () => {
    console.log("가입 버튼 클릭ㅋㅋ");
    axios
      .post("http://web.expertly.info:8012/api/auth/account", {
        email,
        name,
        userId,
        password,
      })
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          console.log("가입 성공!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        error.response.data === "email" ? setDuplicateInput("이메일") : setDuplicateInput("사용자 이름")
      });
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
                className="input-text"
                onChange={handleEmailChange}
                id="join-email"
                type="email"
                name="email"
                placeholder="이메일 주소"
              />
              <input
                onChange={handleNameChange}
                id="join-name"
                type="text"
                name="name"
                placeholder="성명"
              />
              <input
                className="input-text"
                onChange={handleUserIdChange}
                id="join-userId"
                type="text"
                name="userId"
                placeholder="사용자 이름"
              />
              <input
                onChange={handlePasswordChange}
                id="join-password"
                type="password"
                name="password"
                placeholder="비밀번호"
              />
              <br />
            </form>
            {duplicateInput.length > 0 ?
              <div className="warning-text">이미 존재하는 {duplicateInput}입니다.</div> : <div />
            }
            <button
              type="submit"
              className={
                email.length > 0 &&
                  name.length > 0 &&
                  userId.length > 0 &&
                  password.length > 0
                  ? "on"
                  : "off"
              }
              onClick={
                email.length > 0 &&
                  name.length > 0 &&
                  userId.length > 0 &&
                  password.length > 0
                  ? handleComplete
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
