const { router, Result, once } = require('../../connent')

// 获取列表
router.post('/incomeExpenses/list', async (req, res) => {
  // 获取参数
  const { roleId, mark = '', type = '', createTime = '', pageSize = 20, pageIndex = 1 } = req.body
  let markSql = mark ? `and mark like '%${mark}%'` : ''
  let typeSql = type === '' ? '' : `and type = ${type}`
  let s;
  let e;
  if (createTime) {
    s = +new Date(`${createTime} 00:00:00`)
    e = +new Date(`${createTime} 23:59:59`)
  }
  let createTimeSql = createTime ? `and create_time between ${s} and ${e}` : ''
  const r = await once(`select * from income_expenses where role_id = ${roleId} ${[markSql, createTimeSql, typeSql].join(' ')} order by create_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`)
  if (!r.e) {
    res.json(new Result({ code: 0, data: r.r, msg: '获取成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 添加收支明细
router.post('/incomeExpenses/add', async (req, res) => {
  // 获取参数
  const { roleId, accountId, type = 0, mark = '', amount = 0, permission = 0, } = req.body
  if (!roleId || !accountId) return res.json(new Result({ code: -1, msg: 'roleId 与 accountId 必传' }))
  let create_time = +new Date()
  const r = await once(`insert into income_expenses (role_id, account_id, type, mark, amount, permission, create_time) values ('${roleId}', '${accountId}', '${type}', '${mark}', ${amount}, ${permission}, ${create_time})`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '添加成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 编辑收支明细
router.post('/incomeExpenses/update', async (req, res) => {
  // 获取参数
  const { id, type = 0, mark = '', amount = 0, permission = 0, } = req.body
  // 验证记录 id
  if (!id) return res.json(new Result({ code: -1, msg: '记录 id 必传' }))
  // 执行更新语句
  const r = await once(`update income_expenses set type = ${type}, mark = '${mark}', amount = ${amount}, permission = ${permission} where id = ${id}`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 删除收支明细
router.post('/incomeExpenses/delete', async (req, res) => {
  // 获取参数
  const { id } = req.body
  // 验证记录 id
  if (!id) return res.json(new Result({ code: -1, msg: '记录 id 必传' }))
  // 执行更新语句
  const r = await once(`delete from income_expenses where id = ${id}`)
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

module.exports = router