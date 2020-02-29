import fetch from '@/utils/fetch.js'

// 修改密码
export function changePassword(data = '') {
  return fetch({
    method: 'post',
    url: '/api/account/change_password',
    data: data
  })
}