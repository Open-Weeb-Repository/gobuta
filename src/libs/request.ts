import axios, {AxiosRequestConfig} from "axios";
import logger from "./logger";
import MyError from "../commons/MyError";

// create axios
const _instance = axios.create({
  timeout: 3000 || parseInt(process.env.AXIOS_TIMEOUT as string, 10)
});
_instance.interceptors.request.use(config => {
  logger.debug(`REQUEST::fetching ${config.method} ${config.url} started`);
  return config;
});

_instance.interceptors.response.use(response => {
  logger.debug(`REQUEST::fetching ${response.config.method} ${response.config.url} done with status ${response.status}`);
  return response;
}, () => {
  return Promise.reject(new MyError('Request Error', 'REQUEST'));
})

const createRequest = (url: string, config?: AxiosRequestConfig)=> {
  return _instance(url, config);
}

export default {
  createRequest
}
