import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4941/api/v1/',
  timeout: 5000,
  headers: {
    'Content-Type':'application/json'
  }
});

axios.interceptors.request.use = instance.interceptors.request.use
// instance.interceptors.request.use(config => {
// 	if(localStorage.getItem('token')) {
// 		config.headers.Authorization = `token ${localStorage.getItem('token')}`
// 			.replace(/(^\")|(\"$)/g, '')
// 	}
// 	return config
// }, err => {
// 	return Promise.reject(err)
// })

// axios拦截响应
instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default instance;

