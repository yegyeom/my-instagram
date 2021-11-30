import "../styles/css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home/index";
import Account from "./home/Account";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
