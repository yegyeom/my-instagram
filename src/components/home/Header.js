import { Link } from "react-router-dom";
import instagram_logo from "../../styles/images/instagram_logo.svg";
import home from '../../styles/images/home.png';
import post from '../../styles/images/new.png';
import profile from '../../styles/images/profile.png';
import follow from '../../styles/images/follow.png';
import msg from '../../styles/images/msg.png';
import logout from '../../styles/images/logout.png';
import axios from 'axios';
import { useNavigate } from "react-router";
import { useContext, useState } from 'react';
import UserContext from '../../contexts/users';
import PostContext from "../../contexts/post";
import { getPosts } from "../../api/post";

const Header = () => {
    const navigate = useNavigate();
    const { setUserid } = useContext(UserContext).actions;
    const [searchWord, setSearchWord] = useState("");
    const { setPost, setCurrentPage, setTotalLength } = useContext(PostContext).actions;

    const navItems = [
        { path: '/home', img: home, title: '홈' },
        { path: '/new', img: post, title: '글쓰기' },
        { path: '/profile', img: profile, title: '프로필' },
        { path: '/follow', img: follow, title: '팔로우' },
        { path: '/msg', img: msg, title: '메시지' },
    ];

    const navList = navItems.map((item, idx) =>
        <Link to={item.path} key={idx}>
            <img className="header-icon" src={item.img} alt="header-icon" />
        </Link>
    )

    const handleSearchButtonClick = () => {
        const searchType = document.getElementsByName('search');

        searchType.forEach(async (node) => {
            if (node.checked) {
                try {
                    const res = await getPosts(1, searchWord, node.id);
                    console.log(res.data);
                    setPost(res.data);
                    setCurrentPage(1);
                    setTotalLength(res.data.length);
                } catch (error) {
                    console.log('검색 실패!')
                    console.log(error);
                }
            }
        })
    }

    const handleChange = (e) => {
        setSearchWord(e.target.value);
    }

    const handleLogoutClick = () => {
        console.log('logout');
        axios
            .post("http://web.expertly.info:8012/api/auth/logout", {
            }, { withCredentials: true })
            .then((res) => {
                console.log('로그아웃 성공!');
                setUserid("");
                sessionStorage.clear();

                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="header">
            <div className="header-layout">
                <img className="logo-img" src={instagram_logo} alt="logo-img" />
                <div className="header-radio">
                    <div >
                        <input type="radio" name="search" id="writer" defaultChecked="checked" /><label htmlFor="writer">작성자</label>
                        <input type="radio" name="search" id="post" /><label htmlFor="post">게시글</label>
                        <input type="radio" name="search" id="hashtag" /><label htmlFor="hashtag">해시태그</label>
                        <div>
                            <input type="text" className="header-search" value={searchWord} onChange={handleChange} placeholder="검색어를 입력하세요" />
                            <button onClick={handleSearchButtonClick} className="header-search-button">검색</button>
                        </div>
                    </div>
                </div>
                <div className="header-icons">
                    {navList}
                    <img type="submit" onClick={handleLogoutClick} className="header-icon" src={logout} alt="header-icon" />
                </div>
            </div>
        </div>
    )
}

export default Header;