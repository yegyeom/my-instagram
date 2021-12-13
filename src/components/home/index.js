import Post from './Post';
import Paging from './Paging';
import Header from './Header';
import { useState, useEffect } from 'react';
import { getPosts } from '../../api/post';

const Index = () => {
    const [totalLength, setTotalLength] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지
    const [postPerPage] = useState(9); //페이지당 포스트 개수
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        async function fetchLength() {
            try {
                const res = await getPosts(0);
                setTotalLength(res.data.length);
            } catch (error) {
                console.log('목록 불러오기 실패 1');
                console.log(error);
            }
        }

        fetchLength();
    }, []);

    useEffect(() => {
        async function fetchPostList() {
            try {
                const res = await getPosts(currentPage);
                setPostList(res.data);
            } catch (error) {
                console.log('목록 불러오기 실패 2');
                console.log(error);
            }
        }

        fetchPostList();
    }, [currentPage]);

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <div className="home-layout">
                <Header />
                <Post pagePostList={postList} />
                <Paging currentPage={currentPage} onChange={handlePaginationChange} totalLength={totalLength} postPerPage={postPerPage} />
            </div>
        </>
    )
}

export default Index;