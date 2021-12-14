import React, { useState, useContext } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import cap_main1 from "../../styles/images/cap_main1.JPG";
import instagram_logo from "../../styles/images/instagram_logo.svg";
import UserContext from "../../contexts/users";

const Main = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [warningText, setWarningText] = useState("");
  const { setUserid, setId } = useContext(UserContext).actions;

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleComplete = () => {
    axios
      .post("http://web.expertly.info:8012/api/auth/login", {
        userId,
        password,
      }, { withCredentials: true })
      .then((res) => {
        const { status } = res;

        if (status === 200) {
          sessionStorage.setItem('id', res.data.id);
          sessionStorage.setItem('userId', res.data.userId);
          setId(res.data.id);
          setUserid(res.data.userId);

          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error);
        setWarningText(error.response.data.message);
        clearInput(error.response.data.num);
      });
  };

  const clearInput = (num) => {
    var el = document.getElementsByClassName("input-text");

    for (var i = num; i < el.length; i++) {
      el[i].value = '';
    }
  }

  return (
    <div className="main-page">
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
                  className="input-text"
                  onChange={handleUserIdChange}
                  id="userId"
                  type="text"
                  name="userId"
                  placeholder="사용자 이름"
                />
                <input
                  className="input-text"
                  onChange={handlePasswordChange}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                />
                <br />
              </form>
              {warningText.length > 0 ?
                <div className="warning-text">{warningText}</div> : <div />
              }
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
    </div>
  );
};

export default Main;
