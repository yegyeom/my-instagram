import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper";
import { useNavigate } from 'react-router';
import moment from 'moment';

const Post = (props) => {
  const { pagePostList } = props;
  const navigate = useNavigate();
  SwiperCore.use([Pagination])
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(pagePostList);
  }, [pagePostList]);

  const handleClick = (e) => {
    navigate('/edit', { state: e.target.value });
  }

  const postList = posts.map((item, idx) => { // 게시글 하나씩 돌면서
    const imgList = item.Images.map((img, idx) =>
      <SwiperSlide key={idx}>
        <img alt="img" className="post-img" src={`http://web.expertly.info/~web12/${img.path}`} />
      </SwiperSlide>
    )
    const editDate = moment(item.createdAt).format('yyyy-MM-DD HH:mm:ss');
    const check = idx % 3 === 1 ? true : false;
    const editContent = item.content.split(/(#[^\s]+)/g).map((v, idx) => {
      if (v.match(/#[^\s]+/)) {
        return (
          <a href="home" key={idx}>{v}</a>
        );
      }
      return v;
    })

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
          <span>{editContent}</span>
        </div>
        <div className="post-bottom">
          <span >{editDate}</span>
          {item.UserId === parseInt(sessionStorage.getItem('id')) ? <button className="edit-button" value={item.id} onClick={handleClick}>edit</button> : null}
        </div>
      </div>
    )

  })

  return (
    <>
      <div className="page">
        <div className="posts-layout">
          {postList}
        </div>
      </div>
    </>
  )
};

export default Post;
