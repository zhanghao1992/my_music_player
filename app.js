var express = require('express')
// var config = require('./config/index')
var proxy = require('http-proxy-middleware')

// var port = process.env.PORT || config.dev.port

var port = 9001

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
  req.url = 'index.html'
  next()
})
app.use(router)

// 跨域代理
var myProxy = proxy({
  target: 'https://c.y.qq.com/',
  headers: {
    referer: 'https://y.qq.com/portal/playlist.html',
    host: 'c.y.qq.com'
  },
  changeOrigin: true,
  pathRewrite: {
    '^/qq_music_api': '/'
  }
})
app.use('/qq_music_api', myProxy)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listening at http://localhost:' + port)
})
