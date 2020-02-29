const { router, Result, once } = require('../../connent')

// 获取列表
router.post('/publicDetail/list', async (req, res) => {
  // 获取参数
  const { roleId = '',accountId = '' , pageSize = 20, pageIndex = 1 } = req.body
  if(!roleId || !accountId) res.json(new Result({ code: -1, msg: 'roleId 与 accountId 必传' }))
  // 查询角色查看权限
  const r = (await once(`select permission from roles where id = ${roleId}`)).r[0].permission
  if (r) {
    // 获公开取理财明细
    const financial = await once(`select * from financial where account_id = ${accountId} and permission = 1 order by create_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`)
    // 获公开收支财明细
    const incomeExpenses = await once(`select * from income_expenses where account_id = ${accountId} and permission = 1 order by create_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`)
    if(financial.e) return res.json(new Result({ code: -1, msg: financial.e }))
    if (incomeExpenses.e) return res.json(new Result({ code: -1, msg: incomeExpenses.e }))
    return res.json(new Result({ code: 0, data: {financial: financial.r, incomeExpenses: incomeExpenses.r}, msg: '获取成功' }))
  } else {
    res.json(new Result({ code: -1, msg: '无查看权限' }))
  }
})

module.exports = router