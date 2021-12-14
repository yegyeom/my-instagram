import Header from "../Header";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postImg, post } from "../../../api/post";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from "swiper";

const New = () => {
    const navigate = useNavigate();
    SwiperCore.use([Navigation])

    const [img, setImg] = useState([]);
    const [preview, setPreview] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [content, setContent] = useState("");
    const formData = new FormData();

    const handleChange = (e) => {
        const { files, value } = e.target;
        if (files.length <= 5) {
            setPreview([...files]);
            setImg([...files]);
            setInputValue(files.length > 1 ? `${files.length}장의 사진이 선택되었습니다.` : value);
        } else {
            alert('등록 가능한 사진 개수는 최대 5개입니다!')
        }
    }

    const handleButtonClick = async () => {
        for (let i = 0; i < img.length; i++) {
            formData.append('image', img[i]);
        }

        try {
            const images = await postImg(formData);
            const imagePaths = images.data.map((e) => e.path);

            await post({ content, imagePaths });
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
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
                        <textarea type="text" className="post-content" defaultValue={content} onChange={handleContentChange} placeholder="내용을 입력해보세요!" />
                        <br />
                        <button className="post-button" onClick={handleButtonClick}>게시</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default New;