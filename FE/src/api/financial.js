import fetch from '@/utils/fetch.js'

// 获取记录列表
export function list(data = '') {
  return fetch({
    method: 'post',
    url: '/api/financial/list',
    data: data
  })
}

// 添加记录
export function add(data = '') {
  return fetch({
    method: 'post',
    url: '/api/financial/add',
    data: data
  })
}

// 删除记录
export function fdelete(data = '') {
  return fetch({
    method: 'post',
    url: '/api/financial/delete',
    data: data
  })
}
// 首页数据
export function dashboard(data = '') {
  return fetch({
    method: 'post',
    url: '/api/financial/dashboard',
    data: data
  })
}