import axios from './index';

export const postImg = (formData) => axios.post("/api/post/img", formData);
export const post = (post) => axios.post("api/post", post);
export const getPosts = () => axios.get("api/post/posts");