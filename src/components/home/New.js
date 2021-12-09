import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postImg, postPost } from "../../api/post";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from "swiper";

const New = () => {
    const navigate = useNavigate();
    SwiperCore.use([Navigation])

    const [img, setImg] = useState([]);
    const [preview, setPreview] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const formData = new FormData();

    const handleChange = (e) => {
        const { files, value } = e.target;
        setPreview([...files]);
        setImg([...files]);
        setInputValue(files.length > 1 ? `${files.length}장의 사진이 선택되었습니다.` : value);
    }

    const handleClick = () => {
        console.log(img);
        for (let i = 0; i < img.length; i++) {
            formData.append('image', img[i]);
            console.log(img[i]);
        }

        return async () => {
            try {
                const res1 = await postImg(formData);
                console.log(res1.data);

                const res2 = await postPost();
                console.log(res2);
                console.log('업로드 성공!');
                navigate('/home');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const previewList = preview.map((item, idx) =>
        <SwiperSlide key={idx}>
            <img alt="preview" src={URL.createObjectURL(item)} className="post-image" />
        </SwiperSlide>
    )

    return (
        <div className="home-layout">
            <Header />
            <div className="page">
                <div className="follow-layout">
                    <div className="file-upload">
                        <div className="upload-layout">
                            <input className="upload-name" value={inputValue} placeholder="첨부파일" />
                            <label htmlFor="file">파일찾기</label>
                            <input type="file" id="file" onChange={handleChange} multiple />
                        </div>
                        {preview.length > 0 ? (
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
                        ) : <div className="empty-img"></div>}
                        <textarea type="text" className="post-content" placeholder="내용을 입력해보세요!" />
                        <br />
                        <button className="post-button" onClick={handleClick}>게시</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default New;