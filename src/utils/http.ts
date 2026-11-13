import axios from 'axios'
import router from '@/router'      // ← 直接导入实例，不要 useRouter()
import { getToken, setToken, removeToken } from '@/utils/auth'


const request = axios.create({
    baseURL: 'http://localhost:81',
    timeout: 5000,
})

//请求拦截器
request.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config
    },
    (error) => Promise.reject(error),
)

//响应拦截器
request.interceptors.response.use(
    (response) => response,
    ({ response }) => {
        // 网络错误兜底
        if (!response) {
            return Promise.reject({ status: 0, msg: '网络异常' })
        }

        const { status ,data} = response

        if (status === 401) {
            if (router.currentRoute.value.name !== 'user') {
                router.push('/user')
            }
            return Promise.reject({ status: 0, msg: '身份验证失败' })
        }

        if (status === 403) {
            return Promise.reject({ status: 0, msg: '越权' })
        }

        // 其他非 2xx 统一 reject
        return Promise.reject({ status: 0, msg: '请求失败','data':data })
    },
)

export default request