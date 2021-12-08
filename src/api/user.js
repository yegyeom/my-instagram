import axios from './index';

export const getUserList = () => axios.get("/api/users/users");
export const getFollowingList = () => axios.get("/api/users/follow");
export const postFollow = (id) => axios.post(`/api/users/${id}/follow`, { id });
export const postUnFollow = (id) => axios.post(`/api/users/${id}/unfollow`, { id });