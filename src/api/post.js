import axios from './index';

export const postImg = (formData) => axios.post("/api/post/img", formData);
export const post = (post) => axios.post("api/post", post);
export const modifyPostImg = (formData) => axios.patch("api/post/img", formData);
export const modifyPost = (post) => axios.patch("api/post/post", post);
export const getPosts = (pageNum = 0, searchWord = '', searchType = '') => axios.get(`api/post?page=${pageNum}&word=${searchWord}&type=${searchType}`);