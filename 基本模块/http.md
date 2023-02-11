以太网规定，联入网络的所有设备，都必须具有网卡接口，数据包一定是从一块网卡传输到另一块网卡。网卡的地址，就是数据包的发送地址和接收地址，mac地址.每一块网卡出厂的时候，都有一个全世界独一无二的mac地址，通常用12个十六进制数字表示。有了mac地址，就可以定位网卡和数据包的路径了。

发送http请求
```js
const http = require('http')

const options = {
  hostname: 'www.microsoft.com',
  port: 80,
  path: '/',
  method: 'GET'
}

const req = http.request(options, res=> {
  console.log('res', res.statusCode);
  console.log('头', JSON.stringify(res.headers))
  res.setEncoding('utf-8')
  res.on('data', chunk=> {
    console.log('相应内容', chunk);
  })
})

req.end();
```


代理服务器
```js
const http = require('http')
const url = require('url')



const server = http.createServer((sreq, sres)=> {
  const url_parts = url.parse(sreq.url)
  const options = {
    hostname: 'www.microsoft.com',
    port: 80,
    path: url_parts.pathname,
    // headers: sreq.headers
  }

  console.log(options)

  const creq = http.get(options, cres=> {
    sres.writeHead(cres.statusCode, cres.headers);
    cres.pipe(sres);
  })

  sreq.pipe(creq)
})

server.listen(3000)

```