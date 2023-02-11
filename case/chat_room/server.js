const net = require('net')

const server = net.createServer()

const clients = []

server.on('connection', clientSocket => {
  clients.push(clientSocket)

  clientSocket.on('data', data=> {
    console.log('有人说：',data.toString());
    // clientSocket.bytesRead 接收数据的字节数

    clients.forEach(socket=> {
      if(socket !== clientSocket) {
        socket.write(data)
      }
    })
  })

  clientSocket.write('hello')

})

server.listen(3000, ()=> {
  console.log('server running...');
})
