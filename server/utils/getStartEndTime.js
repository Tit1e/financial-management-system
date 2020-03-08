const dayjs = require('dayjs')
const getStartEndTime = function (type = 'day') {
  let start, end;
  switch (type) {
    case 'week':
      start = dayjs().startOf(type).add(1, 'days').valueOf()
      end = dayjs().endOf(type).add(1, 'days').valueOf()
      break
    default:
      start = dayjs().startOf(type).valueOf()
      end = dayjs().endOf(type).valueOf()
      break
  }
  return {start, end}
}
module.exports = {
  getStartEndTime
}