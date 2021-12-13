import axios from './index';

export const postImg = (formData) => axios.post("/api/post/img", formData);
export const post = (post) => axios.post("api/post", post);
export const modifyPostImg = (formData) => axios.patch("api/post/img", formData);
export const modifyPost = (post) => axios.patch("api/post/post", post);
export const getPosts = () => axios.get("api/post/posts"); //전체 포스트