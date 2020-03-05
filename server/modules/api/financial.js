const dayjs = require("dayjs")
const { router, Result, once } = require("../../connent")

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
    `select * from financial where account_id = ${accountId} and status = 1 ${[remarkSql, useTimeSql, typeSql].join(" ")} order by create_time DESC limit ${(pageIndex - 1) * pageSize}, ${pageSize}`
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

module.exports = router
