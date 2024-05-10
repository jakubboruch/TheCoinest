import axios from "axios";
import type { AxiosInstance } from "axios";
const http: AxiosInstance = axios.create({
  baseURL: 'https://api.coinpaprika.com/v1'
});
export default http;