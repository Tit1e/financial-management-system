const jwt = require('jsonwebtoken')
const { router, Result, once } = require('../../connent')

// 根据账号 id 获取该账号下的所有角色
router.post('/roles/get_roles', async (req, res) => {
  const { account_id } = req.body
  // 查询手机号对应的记录
  const r = await once(`SELECT id, account_id, role_name, admin, create_time, permission from roles where account_id = ${account_id}`)
  res.json(new Result({ code: 0, data: r.r }))
})

// 添加角色
router.post('/roles/add_role', async (req, res) => {
  const { account_id, role_name, password } = req.body
  // 查询该账号下是否有角色
  const count = (await once(`select count(*) as count from roles where account_id = ${account_id}`)).r[0].count
  // 如果没有角色默认第一个添加的用户为管理员
  let admin = count ? 0 : 1
  let permission = count ? 0 : 1
  let create_time = +new Date()
  const add_result = await once(`insert into roles (account_id, role_name, password, admin, permission, create_time) values ('${account_id}', '${role_name}', '${password}', ${admin}, ${permission}, ${create_time})`)
  if (!add_result.e) {
    const r = await once(`SELECT id, account_id, role_name, admin, create_time, permission from roles where account_id = ${account_id}`)
    res.json(new Result({ code: 0, msg: '添加成功', data: r.r }))
  } else {
    res.json(new Result({ code: 0, data: add_result.e }))
  }
})

// 验证角色密码
router.post('/roles/check_role', async (req, res) => {
  const { id, account_id, password } = req.body
  // 根据 id 获取角色
  const r = (await once(`select * from roles where id = ${id}`)).r[0]
  // 验证密码是否正确
  if (r.password === password) {
    const token = jwt.sign({id: account_id, roleId: id}, 'jtcwglxt', {expiresIn: 60 * 60 * 24})
    res.json(new Result({ code: 0, data: token, msg: '验证成功' }))
  } else {
    res.json(new Result({ code: -1, msg: '验证失败，密码错误' }))
  }
})

// 删除角色
router.post('/roles/delete_role', async (req, res) => {
  const { account_id, id, password } = req.body
  // 根据 id 获取角色
  const r = (await once(`select * from roles where id = ${id}`)).r[0]
  // 验证密码是否正确
  if (r.password === password) {
    const dr = (await once(`delete from roles where id = ${id}`))
    if (!dr.e) {
      const r = (await once(`SELECT id, account_id, role_name, admin, create_time, permission from roles where account_id = ${account_id}`)).r
      res.json(new Result({ code: 0, msg: '删除成功', data: r }))
    } else {
      res.json(new Result({ code: -1, msg: dr.e }))
    }
  } else {
    res.json(new Result({ code: -1, msg: '验证失败，密码错误' }))
  }
})

// 设置角色权限
router.post('/roles/set_permission', async (req, res) => {
  // 获取数据
  const { id, permission } = req.body
  // 设置权限
  const r = (await once(`update roles set permission = ${permission} where id = ${id}`))
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 清空角色密码
router.post('/roles/clear_password', async (req, res) => {
  const { id } = req.body
  const r = (await once(`update roles set password = '' where id = ${id}`))
  if (!r.e) {
    res.json(new Result({ code: 0, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 验证角色密码是否为空
router.post('/roles/check_password', async (req, res) => {
  const { id } = req.body
  // 根据 id 获取角色
  const r = (await once(`select * from roles where id = ${id}`)).r[0]
  if (r.password) {
    return res.json(new Result({ code: 0, data: true }))
  } else {
    return res.json(new Result({ code: 0, data: false }))
  }
})

// 重新设置密码
router.post('/roles/set_password', async (req, res) => {
  const { id, account_id, password } = req.body
  // 根据 id 获取角色
  const r = (await once(`update roles set password = '${password}' where id = ${id}`))
  if (!r.e) {
    const token = jwt.sign({id: account_id, roleId: id}, 'jtcwglxt', {expiresIn: 60 * 60 * 24})
    res.json(new Result({ code: 0, data: token, msg: '操作成功' }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

module.exports = router