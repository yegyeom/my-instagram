import Header from './Header';
import { getPosts } from '../../api/post';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper";
import { useNavigate } from 'react-router';
import moment from 'moment';

const Home = () => {
  const navigate = useNavigate();
  SwiperCore.use([Pagination])
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const res = await getPosts();
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log('목록 불러오기 실패');
        console.log(error);
      }
    }

    fetchPostList();
  }, []);

  const handleEdit = (e) => {
    navigate('/edit');
  }

  const postList = posts.map((item, idx) => { // 게시글 하나씩 돌면서
    const imgList = item.Images.map((img, idx) =>
      <SwiperSlide key={idx}>
        <img alt="img" className="post-img" src={`http://web.expertly.info/~web12/${img.path}`} />
      </SwiperSlide>
    )

    const editDate = moment(item.createdAt).format('yyyy-MM-DD HH:mm:ss');
    const check = idx % 3 === 1 ? true : false;

    return (
      <div className={check ? "post-layout-center" : "post-layout"} key={idx}>
        <div className="post-img-layout">
          <Swiper
            className="banner"
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {imgList}
          </Swiper>
        </div>
        <div className="post-text">
          <a href="home" target="_self">[{item.nick}]</a> &nbsp;
          <span>{item.content}</span>
        </div>
        <div className="post-bottom">
          <span >{editDate}</span>
          {item.UserId === parseInt(sessionStorage.getItem('id')) ? <button className="edit-button" value={item.UserId} onClick={handleEdit}>edit</button> : null}
        </div>
      </div>
    )

  })

  return (
    <>
      <div className="home-layout">
        <Header />
        <div className="page">
          <div className="posts-layout">
            {postList}
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;
