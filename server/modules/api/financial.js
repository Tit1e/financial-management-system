const { router, Result, once } = require("../../connent")
const { getStartEndTime } = require('../../utils/getStartEndTime')
const dayjs = require('dayjs')

// 获取列表
router.post("/financial/list", async (req, res) => {
  // 获取参数
  const {
    accountId,
    remark = "",
    type = "",
    useTime = "",
    pageSize = 20,
    pageIndex = 1
  } = req.body
  if (!accountId)
    return res.json(new Result({ code: -1, msg: "accountId 必传" }))
  const remarkSql = remark ? `and remark like '%${remark}%'` : ""
  const typeSql = type === "" ? "" : `and type = ${type}`
  let s, e;
  if (useTime) {
    s = +new Date(`${useTime} 00:00:00`)
    e = +new Date(`${useTime} 23:59:59`)
  }
  const useTimeSql = useTime
    ? `and use_time between ${s} and ${e}`
    : ""
  const r = await once(
    `select * from financial where account_id = ${accountId} and status = 1 ${[remarkSql, useTimeSql, typeSql].join(" ")} order by use_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`
  )
  const rr = await once(`select count(*) as count from financial where account_id = ${accountId} and status = 1 ${[remarkSql, useTimeSql, typeSql].join(" ")}`)
  const total = rr.r[0] ? rr.r[0].count : 0
  if (!r.e) {
    res.json(new Result({ code: 0, data: {list: r.r, total}, msg: "获取成功" }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 添加记录
router.post("/financial/add", async (req, res) => {
  // 获取参数
  const { accountId, type = 1, remark = "", amount = 0, useTime } = req.body
  if (!accountId)
    return res.json(new Result({ code: -1, msg: "accountId 必传" }))
  if (amount <= 0)
    return res.json(new Result({ code: -1, msg: "金额必须大于 0" }))
  let create_time = +new Date()
  const r = await once(
    `insert into financial (account_id, type, remark, amount, use_time, create_time) values ('${accountId}', '${type}', '${remark}', ${amount}, ${+new Date(useTime)}, ${create_time})`
  )
  if (!r.e) {
    res.json(new Result({ code: 0, msg: "添加成功" }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 删除理财明细
router.post("/financial/delete", async (req, res) => {
  // 获取参数
  const { id } = req.body
  // 验证记录 id
  if (!id) return res.json(new Result({ code: -1, msg: "记录 id 必传" }))
  // 执行更新语句
  const r = await once(`update financial set status = 0 where id = ${id}`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: "操作成功" }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

async function getPieResult(type = 'day', accountId) {
  const { start, end } = getStartEndTime(type)
  const r = await once(
    `select type, SUM(amount) as amount from financial where account_id = ${accountId} and status = 1 and use_time between ${start} and ${end} group by type`
  )
  if (r.e) return []

  const result = r.r.map(i => {
    return {
      name: i.type === 1 ? '支出' : '收入',
      value: i.amount.toFixed(3)
    }
  })
  return result
}

async function getBarResult(type = 'day', accountId) {
  const { start, end } = getStartEndTime(type)
  const dates = []
  const _result = {}
  for (let i = start; i <= end - 86399000; i += 86400000){
    dates.push(i)
  }
  for (let i = 0; i < dates.length; i++){
    const date = dates[i]
    _result[date] = {}
    const _out = await once(
      `select type, use_time, SUM(amount) as amount from financial where account_id = ${accountId} and status = 1 and type = 1 and use_time between ${date} and ${date + 86399000} group by use_time`
    )
    _result[date]['1'] = _out.r.length ? _out.r[0].amount.toFixed(3) : '0.000'
    const _in = await once(
      `select type, use_time, SUM(amount) as amount from financial where account_id = ${accountId} and status = 1 and type = 2 and use_time between ${date} and ${date + 86399000} group by use_time`
    )
    _result[date]['2'] = _in.r.length ? _in.r[0].amount.toFixed(3) : '0.000'
  }
  const result = {
    dates: dates.map(i => dayjs(i).format('M月D日')),
    '1': [],
    '2': []
  }
  Object.keys(_result).forEach(i => {
    result['1'].push(_result[i]['1'])
    result['2'].push(_result[i]['2'])
  })
  return result
}

async function getPieData(accountId) {
  const day = await getPieResult('day', accountId)
  const week = await getPieResult('week', accountId)
  const month = await getPieResult('month', accountId)
  const year = await getPieResult('year', accountId)
  return { day, week, month, year }
}
async function getBarData(accountId){
  const day = await getBarResult('day', accountId)
  const week = await getBarResult('week', accountId)
  const month = await getBarResult('month', accountId)
  return { day, week, month }
}

// 获取首页统计数据
router.post("/financial/dashboard", async (req, res) => {
  // 获取参数
  const { accountId } = req.body
  if (!accountId) return res.json(new Result({ code: -1, msg: "accountId 必传" }))
  const pieData = await getPieData(accountId)
  const barData = await getBarData(accountId)
  const result = { pieData, barData }
  res.json(new Result({ code: 0, data: result, msg: "获取成功" }))
})

module.exports = router
