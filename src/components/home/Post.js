import { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper";
import { useNavigate } from 'react-router';
import moment from 'moment';
import PostContext from '../../contexts/post';
import { getPosts } from '../../api/post';

const Post = (props) => {
  const { setPost, setCurrentPage, setTotalLength, setWord, setType } = useContext(PostContext).actions;
  const { post } = useContext(PostContext).state;
  const navigate = useNavigate();
  SwiperCore.use([Pagination]);

  const handleEditButtonClick = (e) => {
    navigate('/edit', { state: e.target.value });
  }

  const handleHashtagClick = async (e) => {
    const hashtag = e.target.innerText.slice(1);
    setWord(hashtag);
    setType('h');

    try {
      const res = await getPosts(1, hashtag, 'h');
      setPost(res.data);
      setCurrentPage(1);
      setTotalLength(res.data.length);
    } catch (error) {
      console.error(error);
    }
  }

  const handleNickClick = async (e) => {
    const nick = e.target.innerText.slice(1, e.target.innerText.length - 1);
    setWord(nick);
    setType('n');

    try {
      const res = await getPosts(1, nick, 'n');
      setPost(res.data);
      setCurrentPage(1);
      setTotalLength(res.data.length);
    } catch (error) {
      console.error(error);
    }
  }

  const postList = post.map((item, idx) => { // 게시글 하나씩 돌면서
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
          <span value="hashtag" className="post-text-link" onClick={handleHashtagClick} key={idx}>{v}</span>
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
          <span className="post-text-link" onClick={handleNickClick}>[{item.nick}]</span> &nbsp;
          <span>{editContent}</span>
        </div>
        <div className="post-bottom">
          <span >{editDate}</span>
          {item.UserId === parseInt(sessionStorage.getItem('id')) ? <button className="edit-button" value={item.id} onClick={handleEditButtonClick}>edit</button> : null}
        </div>
      </div >
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
