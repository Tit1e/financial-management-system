import fetch from '@/utils/fetch.js'

// 公开明细
export function list(data = '') {
  return fetch({
    method: 'post',
    url: '/api/publicDetail/list',
    data: data
  })
}
