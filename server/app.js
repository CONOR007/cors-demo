const express = require('express')

const app = express()

// 有一个开箱即用的解决方案：cors
// npm i cors
// app.use(cors()) 就可以了

// 当以 GET 请求 / 的时候执行这里
app.get('/', (req, res) => {
  res.send('hello world')
})

// 当以 GET 请求 /abc 的时候执行这里
app.get('/abc', (req, res) => {
  res.send('get abc')
})

// 当以 GET 请求 /abc 的时候执行这里
app.get('/posts', (req, res) => {
  // CORS 其实就是规定的一个 HTTP 协议，客户端和服务端共同遵守
  // 提供 CORS
  // 允许任何主机名的客户端跨域请求
  // res.setHeader('Access-Control-Allow-Origin', '*')

  console.log(req.headers)
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('foo', 'bar')
  res.setHeader('Access-Control-Expose-Headers', 'foo')

  // 比如说缓存，HTTP 缓存

  // 发送响应数据
  res.send('get posts')
})

app.options('/posts', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Access-Control-Allow-Method', 'POST, PUT, DELETE, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization')
  // 结束响应
  res.end()
})

app.post('/posts', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.send('post posts')
})

app.listen(3000, () => {
  console.log('running...')
})
