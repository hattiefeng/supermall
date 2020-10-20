import axios from 'axios'

export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1 拦截请求
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  //2.2 拦截响应
  instance.interceptors.response.use(
    result => {
      return result.data
    }, err => {
      console.log(err);
    }
  )

  //3.发送真正的网络请求
  return instance(config)

}