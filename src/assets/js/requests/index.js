import axios from 'axios'
import qs from 'qs'

function getToken() {
    return localStorage['token'] ? localStorage['token'] : ""
}

const service = axios.create({
    baseURL: 'http://192.168.0.198:3333',
    timeout: 60 * 1000,
})

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        config.data = qs.stringify(config.data)
        if (localStorage['token'])
            config.headers['X-Token'] = getToken()
        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        // // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // // 这个状态码是和后端约定的
        // const code = dataAxios.reset
        if (dataAxios.data && dataAxios.data.token) {
            localStorage['token'] = dataAxios.data.token
        }
        return dataAxios
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        console.log(error)
        return Promise.reject(error)
    }
)

export default service;