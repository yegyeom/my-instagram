import Post from './Post';
import Paging from './Paging';
import Header from './Header';
import { useState, useEffect, useContext } from 'react';
import { getPosts } from '../../api/post';
import PostContext from '../../contexts/post';

const Index = () => {
    const { init, setPost, setCurrentPage, setTotalLength } = useContext(PostContext).actions;
    const { post, currentPage, totalLength, type, word } = useContext(PostContext).state;
    const [postPerPage] = useState(9);

    useEffect(() => {
        async function fetchLength() {
            try {
                const res = await getPosts();
                setTotalLength(res.data.length);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLength();
    }, [setTotalLength]);

    useEffect(() => {
        setPost(post);
    }, [post, setPost]);

    useEffect(() => {
        async function fetchPostList() {
            try {
                const res = await getPosts(currentPage, word, type);
                setPost(res.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPostList();
        setPost(post);
    }, [currentPage]);

    useEffect(() => {
        return () => {
            init();
        }
    }, []);

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