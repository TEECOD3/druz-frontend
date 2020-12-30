import axios from "axios";
import UserService from "utils/UserService";
const rootEndpoint = process.env.BASE_URL;

const instance = axios.create({
  baseURL: rootEndpoint,
  headers: {
    authorization: `Bearer ${UserService.getToken()}`,
  },
});

export const setAuthorization = (token: string): void => {
  instance.defaults.headers["authorization"] = `Bearer ${token}`;
};

export default instance;
