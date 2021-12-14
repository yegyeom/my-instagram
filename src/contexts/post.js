import { createContext, useState } from "react";

const PostContext = createContext({
    state: { post: null, currentPage: 1, totalLength: 0 },
    actions: {
        setPost: () => { },
        setCurrentPage: () => { },
        setTotalLength: () => { }
    }
});

const PostProvider = ({ children }) => {
    const [post, setPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLength, setTotalLength] = useState(1);

    const value = {
        state: { post, currentPage, totalLength },
        actions: { setPost, setCurrentPage, setTotalLength }
    };

    return (
        <PostContext.Provider value={value}>{children}</PostContext.Provider>
    );
};

const { Consumer: PostConsumer } = PostContext;

export { PostProvider, PostConsumer };

export default PostContext;