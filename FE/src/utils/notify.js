import { Notification } from 'element-ui'


const send = (type, options) => {
  if (Object.prototype.toString.call(options) === '[object String]' || Object.prototype.toString.call(options) === '[object Number]') {
    Notification({
      title: '',
      message: options,
      type: type
    })
  } else if(Object.prototype.toString.call(options) === '[object Object]'){
    Notification({
      title: '',
      message: options,
      type: type,
      ...options
    })
  }
}
const notify = {
  success(options) {
    send('success', options)
  },
  warning(options) {
    send('warning', options)
  },
  info(options) {
    send('info', options)
  },
  error(options) {
    send('error', options)
  }
}
export default notify