import '../../styles/css/main.css'
import { Link } from "react-router-dom";
import instagram_logo from "../../styles/images/instagram_logo.svg";
import home from '../../styles/images/home.png';
import post from '../../styles/images/new.png';
import profile from '../../styles/images/profile.png';
import follow from '../../styles/images/follow.png';
import msg from '../../styles/images/msg.png';
import logout from '../../styles/images/logout.png';

const Header = () => {
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

    return (
        <div className="header">
            <div className="header-layout">
                <img className="logo-img" src={instagram_logo} alt="logo-img" />
                <div className="header-radio">
                    <form method="post">
                        <input type="radio" name="search" id="writer" /><label for="writer">작성자</label>
                        <input type="radio" name="search" id="post" /><label for="post">게시글</label>
                        <input type="radio" name="search" id="hashtag" /><label for="hashtag">해시태그</label>
                        <input type="text" className="header-search" placeholder="검색어를 입력하세요" />
                    </form>
                </div>
                <div className="header-icons">
                    {navList}
                    <img className="header-icon" src={logout} alt="header-icon" />
                </div>
            </div>
        </div>
    )
}

export default Header;