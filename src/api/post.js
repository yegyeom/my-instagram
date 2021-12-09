import axios from './index';

export const postImg = (formData) => axios.post("/api/post/img", { formData });
export const postPost = () => axios.post("api/post", {});