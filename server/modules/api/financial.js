const dayjs = require('dayjs')
const { router, Result, once } = require('../../connent')

// 获取列表
router.post('/financial/list', async (req, res) => {
  // 获取参数
  const { roleId, mark = '', financialType = '', createTime = '', pageSize = 20, pageIndex = 1 } = req.body
  let markSql = mark ? `and mark like '%${mark}%'` : ''
  let financialTypeSql = financialType === '' ? '' : `and financial_type = ${financialType}`
  let s;
  let e;
  if (createTime) {
    s = +new Date(`${createTime} 00:00:00`)
    e = +new Date(`${createTime} 23:59:59`)
  }
  let createTimeSql = createTime ? `and create_time between ${s} and ${e}` : ''
  const r = await once(`select * from financial where role_id = ${roleId} ${[markSql, createTimeSql, financialTypeSql].join(' ')} order by create_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`)
  if (!r.e) {
    res.json(new Result({ code: 0, data: r.r, msg: '获取成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 到期提醒
router.post('/financial/notice', async (req, res) => {
  // 获取参数
  const { roleId } = req.body
  const date = dayjs().add(1, 'days').format('YYYY-MM-DD')
  const s = +new Date(`${date} 00:00:00`)
  const e = +new Date(`${date} 23:59:59`)
  const r = await once(`select * from financial where role_id = ${roleId} and remind_time between ${s} and ${e}`)
  if (!r.e) {
    res.json(new Result({ code: 0, data: r.r, msg: '获取成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 添加理财明细
router.post('/financial/add', async (req, res) => {
  // 获取参数
  const { roleId, accountId, financial_type = 0, mark = '', amount = 0, remind_time = 0, permission = 0 } = req.body
  if (!roleId || !accountId) return res.json(new Result({ code: -1, msg: 'roleId 与 accountId 必传' }))

  let create_time = +new Date()
  const r = await once(`insert into financial (role_id, account_id, financial_type, mark, amount, permission, remind_time, create_time) values ('${roleId}', '${accountId}', '${financial_type}', '${mark}', ${amount}, ${permission}, ${remind_time}, ${create_time})`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '添加成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 编辑理财明细
router.post('/financial/update', async (req, res) => {
  // 获取参数
  const { id, financial_type = 0, mark = '', amount = 0, remind_time = 0, permission = 0 } = req.body
  // 验证记录 id
  if (!id) return res.json(new Result({ code: -1, msg: '记录 id 必传' }))
  // 执行更新语句
  const r = await once(`update financial set financial_type = ${financial_type}, mark = '${mark}', amount = ${amount}, permission = ${permission}, remind_time = ${remind_time} where id = ${id}`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 删除理财明细
router.post('/financial/delete', async (req, res) => {
  // 获取参数
  const { id } = req.body
  // 验证记录 id
  if (!id) return res.json(new Result({ code: -1, msg: '记录 id 必传' }))
  // 执行更新语句
  const r = await once(`delete from financial where id = ${id}`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

module.exports = router