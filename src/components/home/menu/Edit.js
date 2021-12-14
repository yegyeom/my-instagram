import { useLocation, useNavigate } from "react-router";
import Header from "../Header";
import { useEffect, useState } from 'react';
import { getPosts, modifyPostImg, modifyPost } from '../../../api/post';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from "swiper";

const Edit = () => {
    SwiperCore.use([Navigation])
    const navigate = useNavigate();
    const { state } = useLocation();
    const postId = parseInt(state);
    const [img, setImg] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [content, setContent] = useState("");
    const formData = new FormData();

    useEffect(() => {
        async function fetchPostInfo() {
            try {
                const res = await getPosts();
                setContent(res.data[postId - 1].content);
                setImg(res.data[postId - 1].Images.map(image => { return { ...image, origin: true } }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchPostInfo();

    }, [postId]);

    const handleImgChange = (e) => {
        const { files, value } = e.target;
        const newImg = img.slice();
        for (let i = 0; i < files.length; i++) newImg.push(files[i]);
        setImg(newImg);
        setInputValue(newImg.length > 1 ? `${newImg.length}장의 사진이 선택되었습니다.` : value);
    }

    const handleModifyButtonClick = async () => {
        for (let i = 0; i < img.length; i++) {
            formData.append('image', img[i]);
        }

        try {
            const images = await modifyPostImg(formData);
            const newImagePaths = images.data.map((e) => e.path); // 새로운 이미지들 경로

            const remainImageId = [];
            for (let i = 0; i < img.length; i++) {
                if (img[i].origin) remainImageId.push(img[i].id)
            }

            await modifyPost({ postId, content, newImagePaths, remainImageId });
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleDeleteButtonClick = (idx) => {
        setImg([...img.slice(0, idx), ...img.slice(idx + 1)]);
    }

    const previewList = img.map((item, idx) => {
        return (
            <SwiperSlide key={idx}>
                <img alt="img" src={item.origin ? `http://web.expertly.info/~web12/${item.path}` : URL.createObjectURL(item)} className="post-image" />
                <button onClick={handleDeleteButtonClick.bind(this, idx)}>삭제</button>
            </SwiperSlide>
        )
    })

    return (
        <div className="home-layout">
            <Header />
            <div className="page">
                <div className="follow-layout">
                    <div className="file-upload">
                        <div className="upload-layout">
                            <input className="upload-name" value={inputValue} placeholder="첨부파일" />
                            <label htmlFor="file">파일찾기</label>
                            <input type="file" id="file" onChange={handleImgChange} multiple />
                        </div>
                        <div className="img-preview">
                            <Swiper
                                className="banner"
                                spaceBetween={50}
                                slidesPerView={1}
                                autoHeight={true}
                                navigation
                            >
                                {previewList}
                            </Swiper>

                        </div>
                        <textarea type="text" className="post-content" defaultValue={content} onChange={handleContentChange} placeholder="내용을 입력해보세요!" />
                        <br />
                        <button className="post-button" onClick={handleModifyButtonClick}>수정</button>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Edit;