import Post from './Post';
import Paging from './Paging';
import Header from './Header';
import { useState, useEffect, useContext } from 'react';
import { getPosts } from '../../api/post';
import PostContext from '../../contexts/post';

const Index = () => {
    const { setPost, setCurrentPage, setTotalLength } = useContext(PostContext).actions;
    const { post, currentPage, totalLength } = useContext(PostContext).state;
    const [postPerPage] = useState(9); //페이지당 포스트 개수

    useEffect(() => {
        async function fetchLength() {
            try {
                const res = await getPosts();
                setTotalLength(res.data.length);
            } catch (error) {
                console.log('목록 불러오기 실패 1');
                console.log(error);
            }
        }

        fetchLength();
    }, [setTotalLength]);

    useEffect(() => {
        async function fetchPostList() {
            try {
                const res = await getPosts(currentPage);
                setPost(res.data);
            } catch (error) {
                console.log('목록 불러오기 실패 2');
                console.log(error);
            }
        }

        fetchPostList();
    }, [setPost, currentPage]);

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <div className="home-layout">
                <Header />
                <Post pagePostList={post} />
                <Paging currentPage={currentPage} onChange={handlePaginationChange} totalLength={totalLength} postPerPage={postPerPage} />
            </div>
        </>
    )
}

export default Index;