import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import Account from "./main/Account";
import Index from "./home/index"
import New from './home/menu/New'
import Edit from "./home/menu/Edit";
import Profile from './home/menu/Profile'
import Follow from "./home/menu/Follow";
import Msg from "./home/menu/Msg";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/users";

const Page = () => {
  const { setUserid, setId } = useContext(UserContext).actions;
  useEffect(() => {
    setId(sessionStorage.getItem('id'));
    setUserid(sessionStorage.getItem('userId'));
  }, [setId, setUserid]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} exact />
          <Route path="/account" element={<Account />} />
          <Route path="/home" element={<Index />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/msg" element={<Msg />} />)
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Page;
