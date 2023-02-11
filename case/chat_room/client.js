const net = require('net')

const client = net.createConnection({
  host:'127.0.0.1',
  port: 3000
})

client.on('connect', ()=> {
  console.log('连接服务器');
  // client.write('world')
  process.stdin.on('data', data=> {
    client.write(data)
  })
})

client.on('data', data=> {
  console.log('服务端发送：' + data.toString());
})
