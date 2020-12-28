import axios from "axios";
import UserService from "utils/UserService";
const rootEndpoint = process.env.BASE_URL || "http://localhost:4000/";

const instance = axios.create({
  baseURL: rootEndpoint,
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
  },
});

export default instance;
