import Cookies from 'js-cookie'

//特定 token 的cookie操作
var logToken = 'token'

export function getToken() {
  return Cookies.get(logToken)
}

export function setToken(token) {
  return Cookies.set(logToken, token, {expires: 7000000})
}

export function removeToken() {
  return Cookies.remove(logToken)
}

//公用的cookie操作
export function setC(name, token) {
  return Cookies.set(name, token, {expires: 7000000})
}

export function getC(name) {
  return Cookies.get(name)
}

export function removeC(name) {
  return Cookies.remove(name)
}
