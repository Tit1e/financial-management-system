const { router, Result, once } = require('../../connent')

// 修改密码
router.post('/account/change_password', async (req, res) => {
  // 获取手机号与密码
  const { id, password, newPassword, recheckPassword } = req.body
  // 查询 id 对应的记录
  const r = (await once(`select * from accounts where id = '${id}'`)).r[0]
  if (r.password === password) {
    if (newPassword === recheckPassword) {
      const r = (await once(`update accounts set password = '${newPassword}' where id = ${id}`))
      if (!r.e) {
        res.json(new Result({ code: 403, msg: '密码重置成功，请重新登录' }))
      } else {
        res.json(new Result({ code: -1, msg: r.e }))
      }
    } else {
      res.json(new Result({ code: -1, msg: '新密码与确认密码输入不一致，请确认后提交' }))
    }
  } else {
    res.json(new Result({ code: -1, msg: '原密码有误，验证失败' }))
  }
})

module.exports = router