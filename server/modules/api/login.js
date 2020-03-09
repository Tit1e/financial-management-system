const jwt = require('jsonwebtoken')
const { router, Result, once } = require('../../connent')

// 用户登录
router.post('/login/user_login', async (req, res) => {
  // 获取手机号与密码
  const { mobile, password } = req.body
  // 查询手机号对应的记录
  const r = await once(`select * from accounts where mobile = '${mobile}'`)
  if (r.r.length) {
    // 如果有记录，将密码进行比较
    const _r = r.r[0]
    // 密码相等
    if (_r.password === password) {
      const { id } = _r
      // 生成 token
      const token = jwt.sign({id}, 'jtcwglxt', {expiresIn: 60 * 60 * 24})
      return res.json(new Result({ code: 0, msg: '登录成功', data: token }))
    } else {
      // 密码不同，返回错误信息
      return res.json(new Result({ code: -1, msg: '密码错误' }))
    }
  } else {
    // 根据手机号没有查到记录，则返回错误信息
    return res.json(new Result({ code: -1, data: '此号码没有注册用户，请注册后重试' }))
  }
})


// 根据 token 获取用户信息
router.post('/login/user_info', async (req, res) => {
  const { token } = req.headers
  jwt.verify(token, 'jtcwglxt', async (err,data) => {
    // token 验证失败，返回登录超时信息，验证成功进入后续流程
    if (err) {
      return res.json(new Result({ code: 403, msg: '登录超时，请重新登录' }))
    } else {
      const { id, roleId} = data
      const r = (await once(`select id, name, mobile, create_time from accounts where id = '${id}'`)).r[0]
      let _r = null
      if (roleId) {
        _r = (await once(`select id, account_id, role_name, admin, create_time, permission from roles where id = '${roleId}'`)).r[0]
      }
      return res.json(new Result({ code: 0, data: { userInfo: r, roleInfo: _r }}))
    }
  })
})

// 退出登录
router.post('/login/out_login', async (req, res) => {
  return res.json(new Result({ code: 0, msg: '退出成功' }))
})

module.exports = router