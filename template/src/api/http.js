import Axios from 'axios'

// 配置axios
Axios.defaults.timeout = 5000

// 请求拦截器
Axios.interceptors.request.use(
  config => {
    const params = Object.assign({}, config.params)

    config.params = params

    return config
  },
  error => {
    return error
  }
)

// 相应拦截器
Axios.interceptors.response.use(
  resopnse => {
    return resopnse.data
  },
  error => {
    const res = error.response || {}
    const data = res.data || {}
    const code = data.code || 404
    const message = data.message || data.desc || '请求出错啦^o^'

    return { code, message }
  }
)

export default Axios
