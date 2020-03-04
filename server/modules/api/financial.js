const dayjs = require("dayjs")
const { router, Result, once } = require("../../connent")

// 获取列表
router.post("/financial/list", async (req, res) => {
  // 获取参数
  const {
    accountId,
    remark = "",
    type = "",
    createTime = "",
    pageSize = 20,
    pageIndex = 1
  } = req.body
  if (!accountId)
    return res.json(new Result({ code: -1, msg: "accountId 必传" }))
  const remarkSql = remark ? `and remark like '%${remark}%'` : ""
  const typeSql = type === "" ? "" : `and type = ${type}`
  let s, e;
  if (createTime) {
    s = +new Date(`${createTime} 00:00:00`)
    e = +new Date(`${createTime} 23:59:59`)
  }
  const createTimeSql = createTime
    ? `and create_time between ${s} and ${e}`
    : ""
  const r = await once(
    `select * from financial where account_id = ${accountId} and status = 1 ${[remarkSql, createTimeSql, typeSql].join(" ")} order by create_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`
  )
  if (!r.e) {
    res.json(new Result({ code: 0, data: r.r, msg: "获取成功" }))
  } else {
    res.json(new Result({ code: -1, msg: r.e }))
  }
})

// 添加记录
router.post("/financial/add", async (req, res) => {
  // 获取参数
  const { accountId, type = 1, remark = "", amount = 0 } = req.body
  if (!accountId)
    return res.json(new Result({ code: -1, msg: "accountId 必传" }))
  if (amount <= 0)
    return res.json(new Result({ code: -1, msg: "金额必须大于 0" }))
  let create_time = +new Date()
  const r = await once(
    `insert into financial (account_id, type, remark, amount, create_time) values ('${accountId}', '${type}', '${remark}', ${amount}, ${create_time})`
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

module.exports = router
