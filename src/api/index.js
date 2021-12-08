import axios from "axios";

export default axios.create({ baseURL: 'http://web.expertly.info:8012', withCredentials: true });
