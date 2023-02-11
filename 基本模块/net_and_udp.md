## net dgram

net 实现基于TCP的数据通信
dgram 实现基于UDP的数据通信

client.js
```js
const net = require('net')

const client = net.createConnection({
  host:'127.0.0.1',
  port:3000
})


client.on('connect', ()=> {
  console.log('连接服务器');
})

client.on('data', data=> {
  console.log(data.toString());
})
```

server.js
```js
const net = require('net')

const server = net.createServer(socket=> {
  server.getConnections((err, count)=> {
    // 每次建立新链接都会触发
    console.log('存在连接数量',count);
    server.maxConnections = 2;
    console.log('tcp服务器最大连接数量', server.maxConnections);
  })
})
// server.close() 拒绝新客户端连接，不会断开现存的连接。

server.on('connection', clientSocket=> {
  console.log('新建立连接');
  clientSocket.write('hello')
})

// 所有客户端连接被关闭时，tcp服务器自动关闭，触发close事件
server.on('close',()=> {})

server.listen(3000, ()=> {
  console.log('server run');
})

```


## UDP
无连接
传输速度快
不可靠
不组装包，不排序包，可靠性由应用层自己负责
支持一对一，一对多通信

单播
```js
const dgram = require('dgram')

const client = dgram.createSocket('udp4')


client.on('listening', ()=> {
  const addressInfo = client.address()
  console.log('client run', addressInfo.address, addressInfo.port);
  client.send('hello', 3000, 'localhost')
})

client.on('message', (msg, remoteInfo) => {
  console.log(`client got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`);
})

client.on('error', err=> {
  console.log('client error', err);
})

// client.bind(3000)
```

```js
const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening', ()=> {
  const addressInfo = server.address()
  console.log('server run', addressInfo.address, addressInfo.port);
  
})

server.on('message', (msg, remoteInfo) => {
  console.log(`server got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`);
  server.send('word', remoteInfo.port, remoteInfo.address)
})

server.on('error', err=> {
  console.log('server error', err);
  
})

server.bind(3000)
```

广播
```js
const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening', ()=> {
  const addressInfo = server.address()
  console.log('server run', addressInfo.address, addressInfo.port);
  server.setBroadcast(true) // 开启广播模式
  server.send('hello', 8000, '255.255.255.255')

  setInterval(()=> {
    // 直接地址
    // 受限地址（局域网范围）255.255.255.255
    server.send('hello', 8000, '255.255.255.255')
  }, 2000)
})

server.on('message', (msg, remoteInfo) => {
  console.log(`server got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`);
  server.send('word', remoteInfo.port, remoteInfo.address)
})

server.on('error', err=> {
  console.log('server error', err);
  
})

server.bind(3000)
```

```js
const dgram = require('dgram')

const client = dgram.createSocket('udp4')


client.on('listening', ()=> {
  const addressInfo = client.address()
  console.log('client run', addressInfo.address, addressInfo.port);
client.send('hello', 3000, 'localhost')
  
})

client.on('message', (msg, remoteInfo) => {
  console.log(`client got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`);
  
})

client.on('error', err=> {
  console.log('client error', err);
})

client.bind(8000)
```



组播
```js
const dgram = require('dgram')

const server = dgram.createSocket('udp4')

server.on('listening', ()=> {
  const addressInfo = server.address()

  setInterval(()=> {
    // 组播地址
    server.send('hello', 8000, '224.0.1.100')
  }, 2000)
})

server.on('message', (msg, remoteInfo) => {
  console.log(`server got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`);
  server.send('word', remoteInfo.port, remoteInfo.address)
})

server.on('error', err=> {
  console.log('server error', err);
  
})

server.bind(3000)
```

```js
const dgram = require('dgram')

const client = dgram.createSocket('udp4')


client.on('listening', ()=> {
  const addressInfo = client.address()
  console.log('client run', addressInfo.address, addressInfo.port);
  // 添加组播的组
  client.addMembership('224.0.1.100')
})

client.on('message', (msg, remoteInfo) => {
  console.log(`client got ${msg} from ${remoteInfo.address}:${remoteInfo.port}`);
  
})

client.on('error', err=> {
  console.log('client error', err);
})

client.bind(8000)
```