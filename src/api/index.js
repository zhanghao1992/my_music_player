var express = require('express')
var router = express.Router()
// 列表页
router.get('/get_skider_list', function (req, res, next) {
  res.send(JSON.stringify({
    code: 0,
    name: 'zhanghao'
  }))
})

module.exports = router
