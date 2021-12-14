import { createContext, useState } from "react";

const PostContext = createContext({
    state: {
        post: null,
        currentPage: 1,
        totalLength: 0,
        word: '',
        type: ''
    },
    actions: {
        setPost: () => { },
        setCurrentPage: () => { },
        setTotalLength: () => { },
        setWord: () => { },
        setType: () => { },
    }
});

const PostProvider = ({ children }) => {
    const [post, setPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLength, setTotalLength] = useState(1);
    const [word, setWord] = useState('');
    const [type, setType] = useState('writer');

    function init() {
        setPost([]);
        setCurrentPage(1);
        setTotalLength(1);
        setWord('');
        setType('writer');
    }

    const value = {
        state: { post, currentPage, totalLength, word, type },
        actions: { init, setPost, setCurrentPage, setTotalLength, setWord, setType }
    };

    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    );
};

const { Consumer: PostConsumer } = PostContext;

export { PostProvider, PostConsumer };

export default PostContext;