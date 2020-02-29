import axios from 'axios'
import { getToken, removeToken } from './cookie.js'
import Notify from '@/utils/notify.js'
import router from '@/router'

/*******************************************/
// 创建axios实例
const service = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? "http://localhost:3999" : "http://129.204.79.16:3999", // api 的 base_url
	timeout: 600000, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(config => {
	config.headers.Token = getToken()
	return config
}, error => {
	Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code === 403) {
			// Notify.error(res.msg)
			removeToken()
			router.push({name: 'login'})
			return Promise.reject(res.msg)
		}
		if (res.code === 0) {
			return Promise.resolve(res)
		} else {
			Notify.error(res.msg)
			return Promise.reject(res.msg)
		}
	},
	error => {
		return Promise.reject(error)
	}
)
export default service
