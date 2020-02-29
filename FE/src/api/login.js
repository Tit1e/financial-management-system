import fetch from '@/utils/fetch.js'

// 用户登录
export function userLogin(data = '') {
  return fetch({
    method: 'post',
    url: '/api/login/user_login',
    data: data
  })
}

// 根据 token 获取用户信息
export function userInfo(data = '') {
  return fetch({
    method: 'post',
    url: '/api/login/user_info',
    data: data
  })
}

// 退出登录
export function outLogin(data = '') {
  return fetch({
    method: 'post',
    url: '/api/login/out_login',
    data: data
  })
}