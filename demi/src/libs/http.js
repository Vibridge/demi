import axios from 'axios';
import coolies from 'js-cookie';
import config from '../config';
import {encode, decode, uuid} from "./tools";


const service = axios.create({
    baseURL: config.baseUrl,
    timeout: 300000,
});
service.interceptors.request.use(function (config) {
    const token = getToken();
    config.headers['x-access-sign'] = '585c84aca67b58e000364309783e31e6';
    if (token) {
        config.headers['Authorization'] = decode(getToken());
    }
    return config;
});

service.interceptors.response.use((response) => {
    // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token
    resetCommonParams(response.headers);
    return response
});

const resetCommonParams = (params)=>{
    if (params.authorization){
        sessionStorage.setItem(uuid(config.baseUrl), encode(params.authorization));
        service.defaults.headers['Authorization'] = decode(getToken());
    }

};

export const delToken = ()=>{
    sessionStorage.removeItem(uuid(config.baseUrl));
    return coolies.remove(uuid(config.baseUrl)) === undefined;
};


export const getToken = ()=>{
    return sessionStorage.getItem(uuid(config.baseUrl));
};

export default {
    methods: {
        apiGet(url, params) {
            return new Promise((resolve, reject) => {
                this.checkResponseStatus(resolve, reject, service.get(url, {params:params}));
            });
        },

        apiPost(url, params) {
            return new Promise((resolve, reject) => {
                this.checkResponseStatus(resolve, reject, service.post(url, params));
            });
        },

        apiDelete(url, params) {
            return new Promise((resolve, reject) => {
                this.checkResponseStatus(resolve, reject, service.delete(url, {params}));
            });
        },

        removeToken(){
            return delToken();
        },

        setToken(params) {
            resetCommonParams(params);
        },

        checkResponseStatus(resolve, reject, request) {
            request.then((response)=>{
                if (response.status !== 200) {
                    this.$message.error(response.statusText);
                    resolve(false);
                } else {
                    response = response.data;
                    if (response.code === 200) {
                        if (response.current_page) {
                            resolve(response);
                        } else {
                            resolve(response.data ? response.data : true);
                        }
                    } else if (response.code === 403) {
                        delToken();
                        window.location.href = '/';
                    } else {
                        this.$message.warning(response.message);
                    }
                    resolve(false);
                }
            }).catch((error)=>{
                this.$message.error(error.message);
                reject(false);
            });
        },

        apiAll(){

        },
    }
}
