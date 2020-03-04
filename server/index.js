const jwt = require('jsonwebtoken')
const { app, Result } = require("./connent")
const login = require("./modules/api/login")
const account = require("./modules/api/account")
const financial = require("./modules/api/financial")

app.all("*", (req, res, next) => {
  // 接口白名单，在白名单中的接口不会验证 token 有效性
  let whiteUrl = [
    '/api/login/user_login',
    '/api/login/out_login',
  ]
  // 在白名单中直接跳过
  if (whiteUrl.includes(req.url)) {
    next()
  } else {
    // 从 header 中获取 token
    const { token } = req.headers
    jwt.verify(token, 'jtcwglxt', err => {
      // token 验证失败，返回登录超时信息，验证成功进入后续流程
      if (err) {
        return res.json(new Result({ code: 403, msg: '登录超时，请重新登录' }))
      } else {
        next()
      }
    })
  }
})

app.use("/api", login, account, financial)

app.listen(3999, () => {
  console.log("服务在 3999 端口启用")
})
