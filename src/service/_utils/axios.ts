import axios from 'axios';
import { config } from './serviceConfig';
const { pathPrefix } = config;
// src/service目录下的所有service，必须使用该实例进行接口调用
export const Axios = axios.create({
    baseURL: `${pathPrefix}`,
});
